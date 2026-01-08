
import React from 'react';
import { ManuscriptStatus } from '../types';
import { STATUS_COLORS, STATUS_ICONS } from '../constants';

interface StatusBadgeProps {
  status: ManuscriptStatus;
  showIcon?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
      {showIcon && <span className="mr-1.5">{STATUS_ICONS[status]}</span>}
      {status}
    </span>
  );
};

export default StatusBadge;
