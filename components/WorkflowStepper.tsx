
import React from 'react';
import { Check, Circle } from 'lucide-react';
import { ManuscriptStatus } from '../types';

interface Step {
  label: string;
  status: ManuscriptStatus;
  description: string;
}

const STEPS: Step[] = [
  { label: 'Draft', status: ManuscriptStatus.DRAFT, description: 'Initial draft by authors' },
  { label: 'Review', status: ManuscriptStatus.UNDER_REVIEW, description: 'Nodal officer feedback' },
  { label: 'Plagiarism', status: ManuscriptStatus.PLAGIARISM_CHECK, description: 'Similarity checking (<12%)' },
  { label: 'Consent', status: ManuscriptStatus.WAITING_CONSENT, description: 'Author approvals' },
  { label: 'APC/Admin', status: ManuscriptStatus.APC_INITIATED, description: 'Financial & final approval' },
  { label: 'Submitted', status: ManuscriptStatus.SUBMITTED, description: 'Final journal submission' },
];

interface WorkflowStepperProps {
  currentStatus: ManuscriptStatus;
}

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStatus }) => {
  const currentIndex = STEPS.findIndex(s => s.status === currentStatus);
  // Default to a fallback if index is not found (e.g., REVISION_REQUIRED maps back to a generic review state for the stepper)
  const normalizedIndex = currentIndex === -1 ? 1 : currentIndex;

  return (
    <div className="py-4">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
        {/* Progress Bar Fill */}
        <div 
          className="absolute top-5 left-0 h-0.5 bg-blue-600 z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${(normalizedIndex / (STEPS.length - 1)) * 100}%` }}
        ></div>

        <div className="relative z-10 flex justify-between">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < normalizedIndex || currentStatus === ManuscriptStatus.SUBMITTED;
            const isCurrent = idx === normalizedIndex && currentStatus !== ManuscriptStatus.SUBMITTED;

            return (
              <div key={step.label} className="flex flex-col items-center group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCurrent 
                      ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50'
                      : 'bg-white border-gray-200 text-gray-400'
                }`}>
                  {isCompleted ? <Check size={20} /> : <Circle size={14} className={isCurrent ? 'fill-current' : ''} />}
                </div>
                <div className="mt-3 text-center">
                  <p className={`text-xs font-bold transition-colors ${isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>{step.label}</p>
                  <p className="text-[10px] text-gray-400 max-w-[80px] leading-tight hidden sm:block">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowStepper;
