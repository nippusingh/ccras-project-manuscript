
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User as UserIcon, MessageSquare, ChevronRight } from 'lucide-react';
import { Manuscript } from '../types';
import StatusBadge from './StatusBadge';

interface ManuscriptCardProps {
  manuscript: Manuscript;
}

const ManuscriptCard: React.FC<ManuscriptCardProps> = ({ manuscript }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <StatusBadge status={manuscript.status} />
          <span className="text-xs text-gray-400 font-medium flex items-center">
            <Calendar size={12} className="mr-1" />
            Updated {manuscript.lastUpdated}
          </span>
        </div>
        
        <Link to={`/manuscripts/${manuscript.id}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
            {manuscript.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 italic">
          {manuscript.abstract}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs text-gray-600">
              <UserIcon size={14} className="mr-1 text-gray-400" />
              <span>{manuscript.authors[0]} {manuscript.authors.length > 1 && `+ ${manuscript.authors.length - 1} more`}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <MessageSquare size={14} className="mr-1 text-gray-400" />
              <span>{manuscript.comments.length} comments</span>
            </div>
          </div>
          
          <Link 
            to={`/manuscripts/${manuscript.id}`}
            className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptCard;
