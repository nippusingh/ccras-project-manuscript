
import React from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Send,
  Users
} from 'lucide-react';
import { ManuscriptStatus } from './types';

export const STATUS_COLORS: Record<ManuscriptStatus, string> = {
  [ManuscriptStatus.DRAFT]: 'bg-gray-100 text-gray-700',
  [ManuscriptStatus.UNDER_REVIEW]: 'bg-blue-100 text-blue-700',
  [ManuscriptStatus.PLAGIARISM_CHECK]: 'bg-yellow-100 text-yellow-700',
  [ManuscriptStatus.WAITING_CONSENT]: 'bg-purple-100 text-purple-700',
  [ManuscriptStatus.APPROVAL_REQUESTED]: 'bg-indigo-100 text-indigo-700',
  [ManuscriptStatus.APC_INITIATED]: 'bg-orange-100 text-orange-700',
  [ManuscriptStatus.APPROVED]: 'bg-green-100 text-green-700',
  [ManuscriptStatus.SUBMITTED]: 'bg-teal-100 text-teal-700',
  [ManuscriptStatus.REVISION_REQUIRED]: 'bg-red-100 text-red-700',
};

export const STATUS_ICONS: Record<ManuscriptStatus, React.ReactNode> = {
  [ManuscriptStatus.DRAFT]: <FileText size={16} />,
  [ManuscriptStatus.UNDER_REVIEW]: <Clock size={16} />,
  [ManuscriptStatus.PLAGIARISM_CHECK]: <Search size={16} />,
  [ManuscriptStatus.WAITING_CONSENT]: <Users size={16} />,
  [ManuscriptStatus.APPROVAL_REQUESTED]: <AlertCircle size={16} />,
  [ManuscriptStatus.APC_INITIATED]: <CreditCard size={16} />,
  [ManuscriptStatus.APPROVED]: <CheckCircle size={16} />,
  [ManuscriptStatus.SUBMITTED]: <Send size={16} />,
  [ManuscriptStatus.REVISION_REQUIRED]: <AlertCircle size={16} />,
};

export const MOCK_USER = {
  id: '1',
  name: 'Dr. Ramesh Sharma',
  email: 'r.sharma@ccras.res.in',
  role: 'Principal Investigator' as any,
  avatar: 'https://picsum.photos/seed/drramesh/200'
};
