export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

export const mainNavLinks: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Molten', path: '/molten' },
  { name: 'Element19', path: '/element19' },
  { name: 'Marketplace', path: '/marketplace' },
];

export const footerLinks: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Molten', path: '/molten' },
  { name: 'Element19', path: '/element19' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Terms', path: '/terms' },
  { name: 'Privacy', path: '/privacy' },
]; 