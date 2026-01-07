export type NavLink = {
  title: string;
  path: string;
};

export type WebsiteLogoProps = {
  image?: string;
  imageTitle?: string;
  imageLink?: string;
};

export type Role = 'GUEST' | 'USER' | 'MODERATOR' | 'OWNER' | 'SUPER_ADMIN';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'file'
  | 'image'
  | 'search';
