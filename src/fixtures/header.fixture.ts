import type { HeaderConfig } from '@/types/header';
import type { Role } from '@/types/common';

export const HEADER: Record<Role, HeaderConfig> = {
  guest: {
    image: 'https://placehold.co/50x50',
    imageTitle: 'Company logo',
    imageLink: '/',
    links: [
      { title: 'Reservio franchise', path: '' },
      { title: 'About us', path: '' },
      { title: 'Our service', path: '' },
    ],
  },
  user: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    message: 'Hello ${User!}',
  },
  moderator: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    message: 'Hello Moderator',
    links: [{ title: 'Moderator page', path: '/moderator' }],
    backgroundColor: 'bg-green-900',
  },
  admin: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    links: [{ title: 'Admin page', path: '/admin' }],
    backgroundColor: 'bg-violet-900',
  },
  superAdmin: {
    imageTitle: 'Company logo',
    imageLink: '/',
    image: 'https://placehold.co/50x50',
    links: [{ title: 'Admin page', path: '/root' }],
    backgroundColor: 'bg-gray-600',
  },
};
