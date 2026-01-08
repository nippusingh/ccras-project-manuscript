
import { Manuscript, ManuscriptStatus, UserRole } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const fetchWithAuth = async (url: string, options: any = {}) => {
  const token = localStorage.getItem('ccras_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'API Request failed');
  }
  
  return response.json();
};

export const loginUser = async (credentials: any) => {
  const data = await fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  if (data.token) {
    localStorage.setItem('ccras_token', data.token);
    localStorage.setItem('ccras_user', JSON.stringify(data));
  }
  return data;
};

export const getManuscripts = async (): Promise<Manuscript[]> => {
  try {
    return await fetchWithAuth('/manuscripts');
  } catch (e) {
    console.warn("Using fallback mock data due to API error", e);
    return MOCK_MANUSCRIPTS;
  }
};

export const getManuscriptById = async (id: string): Promise<Manuscript | undefined> => {
  try {
    // In a real app we'd have a GET /manuscripts/:id
    const all = await getManuscripts();
    return all.find((m: any) => m.id.toString() === id.toString());
  } catch (e) {
    return MOCK_MANUSCRIPTS.find(m => m.id === id);
  }
};

export const updateManuscriptStatus = async (id: string, newStatus: ManuscriptStatus, note: string) => {
  return await fetchWithAuth(`/manuscripts/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ newStatus, note })
  });
};

// Fallback data for local development without DB
export const MOCK_MANUSCRIPTS: Manuscript[] = [
  {
    id: 'm1',
    title: 'Phytochemical and Pharmacological Evaluation of Boerhavia diffusa L. in Renal Disorders',
    authors: ['Dr. Ramesh Sharma'],
    status: ManuscriptStatus.UNDER_REVIEW,
    submissionDate: '2024-03-15',
    lastUpdated: '2 days ago',
    abstract: 'Standard research abstract for testing UI components...',
    apcRequired: false,
    comments: [],
    history: []
  }
];
