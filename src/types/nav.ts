export interface BaseNavItem {
  name: string;
  path: string;
  external?: boolean;
}

export interface NavItem extends BaseNavItem {
  text?: string;
  links?: BaseNavItem[];
}

export interface NavLink extends BaseNavItem {
  label?: string;
  href?: string;
}

export const mainNavLinks: BaseNavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Molten', path: '/molten' },
  { name: 'Element19', path: '/element19' },
  { name: 'Marketplace', path: '/marketplace' },
];

export const footerLinks: BaseNavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Molten', path: '/molten' },
  { name: 'Element19', path: '/element19' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Terms', path: '/terms' },
  { name: 'Privacy', path: '/privacy' },
]; 