
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Plus } from 'lucide-react';
import { MOCK_MANUSCRIPTS } from '../services/api';
import ManuscriptCard from '../components/ManuscriptCard';
import { ManuscriptStatus } from '../types';

const Manuscripts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  const filteredManuscripts = MOCK_MANUSCRIPTS.filter(ms => {
    const matchesSearch = ms.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ms.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'active') return matchesSearch && ms.status !== ManuscriptStatus.SUBMITTED && ms.status !== ManuscriptStatus.APPROVED;
    if (activeTab === 'completed') return matchesSearch && (ms.status === ManuscriptStatus.SUBMITTED || ms.status === ManuscriptStatus.APPROVED);
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Manuscripts</h1>
          <p className="text-gray-500 mt-1">Manage and track your scientific publication lifecycle.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm">
          <Plus size={20} className="mr-2" />
          Submit New MS
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by title, author or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'completed' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Completed
            </button>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="p-6">
          {filteredManuscripts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredManuscripts.map(ms => (
                <ManuscriptCard key={ms.id} manuscript={ms} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No manuscripts found</h3>
              <p className="text-gray-500 max-w-xs mx-auto mt-2">Try adjusting your search terms or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manuscripts;
