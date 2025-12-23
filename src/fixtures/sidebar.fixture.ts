import type { Role } from '@/types/common';
import type { MenuSection, SidebarSection } from '@/types/sidebat';
import { CreditCard, Settings } from 'lucide-react';

export const SIDEBAR: Record<Role, SidebarSection[]> = {
  GUEST: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: 'Home' },
        { title: 'Browse Services', path: '/explore', icon: 'Search' },
      ],
    },
    {
      label: 'Contact us',
      items: [
        { title: 'About Us', path: '/about', icon: 'Info' },
        { title: 'Contact', path: '/contact', icon: 'Mail' },
      ],
    },
  ],
  USER: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: 'Home' },
        { title: 'Browse Services', path: '/explore', icon: 'Search' },
      ],
    },
    {
      label: 'Reservations',
      items: [
        { title: 'My Bookings', path: '/reservations', icon: 'Calendar' },
        { title: 'Favorites', path: '/favorites', icon: 'Heart' },
        { title: 'Reviews', path: '/reviews', icon: 'Star' },
        { title: 'History', path: '/history', icon: 'Clock' },
      ],
    },
    {
      label: 'Support',
      items: [
        { title: 'Help Center', path: '/help', icon: 'HelpCircle' },
        { title: 'Contact Support', path: '/support', icon: 'Mail' },
        { title: 'Feedback', path: '/feedback', icon: 'MessageSquare' },
      ],
    },
  ],
  MODERATOR: [
    {
      label: 'Dashboard',
      items: [{ title: 'Overview', path: '/dashboard', icon: 'Home' }],
    },
    {
      label: 'Moderation',
      items: [
        {
          title: 'Review Queue',
          path: '/moderator/reviews',
          icon: 'FileCheck',
        },
        {
          title: 'User Reports',
          path: '/moderator/reports',
          icon: 'AlertTriangle',
        },
      ],
    },
    {
      label: 'Support',
      items: [
        { title: 'Help Center', path: '/help', icon: 'HelpCircle' },
        { title: 'Contact Support', path: '/support', icon: 'Mail' },
      ],
    },
  ],
  OWNER: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Overview', path: '/admin/dashboard', icon: 'Home' },
        { title: 'Analytics', path: '/admin/analytics', icon: 'BarChart' },
        { title: 'Reports', path: '/admin/reports', icon: 'FileText' },
      ],
    },
    {
      label: 'Administration',
      items: [
        { title: 'User Management', path: '/admin#users', icon: 'Users' },
        { title: 'Role Management', path: '/admin#roles', icon: 'Shield' },
        { title: 'Content Control', path: '/admin#content', icon: 'FileCheck' },
        { title: 'System Settings', path: '/admin#system', icon: 'Settings' },
        { title: 'Audit Logs', path: '/admin/logs', icon: 'Activity' },
      ],
    },
    {
      label: 'Moderation',
      items: [
        { title: 'Review Queue', path: '/admin/reviews', icon: 'FileCheck' },
        {
          title: 'User Reports',
          path: '/admin/reports',
          icon: 'AlertTriangle',
        },
      ],
    },
  ],
  SUBER_ADMIN: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Admin Dashboard', path: '/admin/dashboard', icon: 'Home' },
        { title: 'User Dashboard', path: '/admin/user', icon: 'User' },
      ],
    },
  ],
};

export type SidebarConfig = typeof SIDEBAR;

export const USER_MENU: MenuSection = [
  { icon: CreditCard, label: 'Billing', path: '/billing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];
