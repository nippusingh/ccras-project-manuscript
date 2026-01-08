
export enum UserRole {
  PI = 'Principal Investigator',
  CO_PI = 'Co-Principal Investigator',
  NODAL_OFFICER = 'Nodal Officer',
  RPIC = 'RPIC Member',
  PG = 'PG-CCRAS',
  ADMIN = 'Administrator'
}

export enum ManuscriptStatus {
  DRAFT = 'Draft',
  UNDER_REVIEW = 'Under Review',
  PLAGIARISM_CHECK = 'Plagiarism Check',
  WAITING_CONSENT = 'Waiting for Consent',
  APPROVAL_REQUESTED = 'Approval Requested',
  APC_INITIATED = 'APC Initiated',
  APPROVED = 'Approved',
  SUBMITTED = 'Submitted',
  REVISION_REQUIRED = 'Revision Required'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: string;
  role: UserRole;
  text: string;
  timestamp: string;
}

export interface Manuscript {
  id: string;
  title: string;
  authors: string[];
  status: ManuscriptStatus;
  submissionDate: string;
  lastUpdated: string;
  abstract: string;
  plagiarismScore?: number;
  apcRequired: boolean;
  apcAmount?: number;
  comments: Comment[];
  history: {
    status: ManuscriptStatus;
    timestamp: string;
    note: string;
  }[];
}
