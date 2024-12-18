export interface User {
  address: string;
  // Add other user properties
}

export interface AuthState {
  user: User | null;
  token: string;
  loading: boolean;
  errorMessage: string | null;
}

export interface AuthAction {
  type: string;
  payload?: unknown;
  error?: Error;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface GlobalContextType {
  state: {
    open: boolean;
    auth: boolean;
    trigger: number;
  };
  setState: React.Dispatch<React.SetStateAction<{
    open: boolean;
    auth: boolean;
    trigger: number;
  }>>;
}

export interface FooterLinkProps {
  name: string;
  path: string;
  external?: boolean;
}

export interface NavLinkProps {
  name: string;
  path: string;
  external?: boolean;
}

// Collection Types
export type CollectionStatus = 'Available' | 'Coming Soon' | 'Sold Out';

export interface CollectionItem {
  image: string;
  title: string;
  description: string;
  price?: string;
  releaseDate?: string;
  status: CollectionStatus;
}

export interface Element19Collections {
  comics: CollectionItem[];
  posters: CollectionItem[];
  upcoming: CollectionItem[];
} 