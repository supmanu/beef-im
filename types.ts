export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string; // HTML content for the reader view
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'XLS' | 'CHECKLIST';
  downloadUrl: string;
  isLocked: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}