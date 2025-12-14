import type { HeaderConfig } from '@/types/header';
import type { Role } from '@/types/common';

export const HEADER: Record<Role, HeaderConfig> = {
  GUEST: {
    image: 'https://placehold.co/50x50',
    imageTitle: 'Company logo',
    imageLink: '/',
  },
  USER: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    message: 'Hello ${User!}',
  },
  MODERATOR: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    message: 'Hello Moderator',
    backgroundColor: 'bg-green-900',
  },
  OWNER: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    backgroundColor: 'bg-violet-900',
  },
  SUBER_ADMIN: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    backgroundColor: 'bg-gray-600',
  },
};
