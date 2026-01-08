
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_MANUSCRIPTS } from '../services/api';
import ManuscriptCard from '../components/ManuscriptCard';

const chartData = [
  { name: 'Drafts', count: 4, color: '#94a3b8' },
  { name: 'Under Review', count: 7, color: '#3b82f6' },
  { name: 'Consent', count: 3, color: '#a855f7' },
  { name: 'APC/Admin', count: 2, color: '#f59e0b' },
  { name: 'Approved', count: 5, color: '#10b981' },
];

const Dashboard: React.FC = () => {
  const activeManuscripts = MOCK_MANUSCRIPTS.slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research Portfolio</h1>
          <p className="text-gray-500 mt-1">Welcome back, Dr. Sharma. Here is what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/manuscripts/new" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all">
            <Plus size={20} className="mr-2" />
            New Manuscript
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Submitted" value="18" icon={<FileText className="text-blue-600" />} trend="+2 this month" />
        <StatCard title="In Review" value="7" icon={<Clock className="text-amber-500" />} trend="Active workflow" />
        <StatCard title="Approved" value="11" icon={<CheckCircle className="text-green-500" />} trend="Across all departments" />
        <StatCard title="Success Rate" value="92%" icon={<TrendingUp className="text-indigo-600" />} trend="+4.5% year over year" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Recent Manuscripts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Active Workflows</h2>
              <Link to="/manuscripts" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                View all <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {activeManuscripts.map(ms => (
                <ManuscriptCard key={ms.id} manuscript={ms} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Activity & Charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Status Overview</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} hide />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
               {chartData.map((d) => (
                 <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: d.color }}></div>
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{d.count}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">Our AI-powered assistant can help you check plagiarism requirements and APC eligibility before submission.</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                Launch Assistant
              </button>
            </div>
            <Search className="absolute -bottom-6 -right-6 text-blue-500 opacity-20 w-32 h-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">{trend}</span>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

export default Dashboard;
