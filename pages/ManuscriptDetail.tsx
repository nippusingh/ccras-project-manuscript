
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  AlertTriangle,
  FileText,
  Sparkles,
  Paperclip,
  Send,
  Search
} from 'lucide-react';
import { getManuscriptById } from '../services/api';
import { getSmartReview } from '../services/gemini';
import StatusBadge from '../components/StatusBadge';
import WorkflowStepper from '../components/WorkflowStepper';
import { Manuscript, ManuscriptStatus, UserRole } from '../types';
import { MOCK_USER } from '../constants';

const ManuscriptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Fix: ms state was incorrectly initialized with a Promise.
  // Changed to Manuscript | undefined and added a proper loading state.
  const [ms, setMs] = useState<Manuscript | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'history'>('details');
  const [commentText, setCommentText] = useState('');

  // Fix: Use useEffect to fetch the manuscript data asynchronously.
  useEffect(() => {
    const fetchManuscript = async () => {
      if (id) {
        setLoading(true);
        const data = await getManuscriptById(id);
        setMs(data);
        setLoading(false);
      }
    };
    fetchManuscript();
  }, [id]);

  useEffect(() => {
    if (ms) {
      handleGetAiReview();
    }
  }, [ms?.id]);

  const handleGetAiReview = async () => {
    if (!ms) return;
    setLoadingAi(true);
    const result = await getSmartReview(ms.title, ms.abstract, ms.status);
    setAiAnalysis(result || '');
    setLoadingAi(false);
  };

  const addComment = () => {
    if (!commentText.trim() || !ms) return;
    const newComment = {
      id: Math.random().toString(),
      author: MOCK_USER.name,
      role: MOCK_USER.role as UserRole,
      text: commentText,
      timestamp: 'Just now'
    };
    // Fix: Updated setMs to correctly update the state with the new comment using a functional update.
    setMs(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : undefined);
    setCommentText('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!ms) return <div className="p-10 text-center">Manuscript not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/manuscripts" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <StatusBadge status={ms.status} />
                <h1 className="text-2xl font-bold text-gray-900 mt-3">{ms.title}</h1>
                <div className="flex flex-wrap items-center mt-3 gap-y-2 text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">{ms.authors.join(', ')}</span>
                  <span className="mx-2 hidden sm:inline">•</span>
                  <span>ID: MS-2024-{ms.id.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download Full Draft">
                  <Download size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Share with Co-Authors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="border-t border-b border-gray-100 py-8 mb-8">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Workflow Progress</h2>
              <WorkflowStepper currentStatus={ms.status} />
            </div>

            <div className="space-y-6">
              <div className="flex border-b border-gray-200">
                {(['details', 'comments', 'history'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-bold capitalize transition-all border-b-2 -mb-px ${
                      activeTab === tab 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'details' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                    <h3 className="text-gray-900 font-bold mb-2">Abstract</h3>
                    <p>{ms.abstract}</p>
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Submission Metadata</h4>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] text-gray-400">Plagiarism Score</p>
                            <p className="font-bold text-gray-900">{ms.plagiarismScore !== undefined ? `${ms.plagiarismScore}%` : 'Pending'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400">APC Estimate</p>
                            <p className="font-bold text-gray-900">{ms.apcRequired ? `₹${ms.apcAmount}` : 'Free/Institutional'}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-4">
                    {ms.comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-blue-600 font-bold text-xs">{comment.author[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-sm text-gray-900">{comment.author}</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">{comment.role}</span>
                            <span className="text-[10px] text-gray-400">• {comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Add a comment or suggestion..." 
                      className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addComment()}
                    />
                    <button 
                      onClick={addComment}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                   {ms.history.map((entry, idx) => (
                     <div key={idx} className="flex items-start space-x-4">
                        <div className="mt-1.5">
                          <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold text-gray-900">{entry.status}</p>
                            <p className="text-xs text-gray-400">{entry.timestamp}</p>
                          </div>
                          <p className="text-xs text-gray-500 italic">{entry.note}</p>
                        </div>
                     </div>
                   ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Action Center */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden relative">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              Workflow Actions
            </h2>
            <div className="space-y-3">
              {ms.status === ManuscriptStatus.DRAFT && (
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2">
                  <CheckCircle size={18} />
                  <span>Send to Nodal Officer</span>
                </button>
              )}
              {ms.status === ManuscriptStatus.UNDER_REVIEW && (
                <button className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2">
                  <RefreshCw size={18} />
                  <span>Submit Revision</span>
                </button>
              )}
              {ms.status === ManuscriptStatus.PLAGIARISM_CHECK && (
                <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-all flex items-center justify-center space-x-2">
                  <Search size={18} />
                  <span>View Plagiarism Report</span>
                </button>
              )}
              {ms.status === ManuscriptStatus.REVISION_REQUIRED && (
                 <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2">
                  <AlertTriangle size={18} />
                  <span>Address Review Comments</span>
                </button>
              )}
              <button className="w-full py-3 px-4 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
                <Paperclip size={18} />
                <span>Upload Attachment</span>
              </button>
            </div>
          </div>

          {/* AI Smart Assistant */}
          <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-indigo-500 p-1.5 rounded-lg">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold">AI Smart Review</h3>
              </div>
              
              <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-700 mb-4 min-h-[100px] flex flex-col justify-center">
                {loadingAi ? (
                  <div className="flex flex-col items-center space-y-2 animate-pulse">
                    <div className="w-full h-2 bg-indigo-700 rounded"></div>
                    <div className="w-5/6 h-2 bg-indigo-700 rounded"></div>
                    <div className="w-4/6 h-2 bg-indigo-700 rounded"></div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-line text-indigo-100 italic">
                    {aiAnalysis}
                  </p>
                )}
              </div>

              <button 
                onClick={handleGetAiReview}
                disabled={loadingAi}
                className="w-full bg-white text-indigo-900 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loadingAi ? 'animate-spin' : ''} />
                <span>Regenerate Advice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptDetail;
