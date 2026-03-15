import type { ROLES } from '@/constants/roles';

export type NavLink = {
  title: string;
  path: string;
};

export type WebsiteLogoProps = {
  image?: string;
  imageTitle?: string;
  imageLink?: string;
};

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'file'
  | 'image'
  | 'search'
  | 'number';
