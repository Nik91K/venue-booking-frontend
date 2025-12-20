import type { NavLink, Role } from './common';

export type FooterProps = {
  image?: string;
  imageTitle?: string;
  imageLink?: string;
  quickLinks?: NavLink[];
  role: Role;
};
