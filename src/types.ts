import type { ReactNode } from 'react';

export interface GuidePage {
  id: number;
  title: string;
  category: string;
  subtitle?: string;
  content: ReactNode;
}

export interface LeadInfo {
  name: string;
  email: string;
  phone?: string;
  capturedAt: string;
}

export interface TestAnswers {
  [key: number]: number; // question index -> score (0, 1, 2, 3)
}
