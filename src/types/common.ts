export type NavLink = {
  title: string;
  path: string;
};

export type WebsiteLogoProps = {
  image?: string;
  imageTitle?: string;
  imageLink?: string;
};

export type Role = 'guest' | 'user' | 'moderator' | 'admin' | 'superAdmin';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'file'
  | 'image'
  | 'search';
