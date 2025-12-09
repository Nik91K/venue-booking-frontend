import type { NavLink } from './common';

export type HeaderConfig = {
  image?: string;
  imageTitle?: string;
  imageLink?: string;
  message?: string;
  links?: NavLink[];
  backgroundColor?: string;
  textColor?: string;
};
