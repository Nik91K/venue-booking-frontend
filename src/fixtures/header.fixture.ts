import type { HeaderConfig } from '@/types/header';
import type { Role } from '@/types/common';

export const HEADER: Record<Role, HeaderConfig> = {
  GUEST: {
    image: '/src/assets/logo.png',
    imageTitle: 'Company logo',
    imageLink: '/',
  },
  USER: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: '/src/assets/logo.png',
  },
  MODERATOR: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: '/src/assets/logo.png',
    backgroundColor: 'bg-green-900',
  },
  OWNER: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: '/src/assets/logo.png',
    backgroundColor: 'bg-violet-900',
  },
  SUPER_ADMIN: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: '/src/assets/logo.png',
    backgroundColor: 'bg-gray-600',
  },
};
