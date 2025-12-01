import type { Role } from '@/types/common';
import type { SidebarSection } from '@/types/sidebat';

export const SIDEBAR: Record<Role, SidebarSection[]> = {
  guest: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: 'Home' },
        { title: 'Browse Services', path: '/services', icon: 'Search' },
        { title: 'About Us', path: '/about', icon: 'Info' },
        { title: 'Contact', path: '/contact', icon: 'Mail' },
      ],
    },
    {
      label: 'Get Started',
      items: [
        { title: 'Sign Up', path: '/signup', icon: 'UserPlus' },
        { title: 'Login', path: '/login', icon: 'LogIn' },
      ],
    },
  ],
  user: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Overview', path: '/dashboard', icon: 'Home' },
        { title: 'Messages', path: '/messages', icon: 'Inbox' },
        { title: 'Calendar', path: '/calendar', icon: 'Calendar' },
        { title: 'Search', path: '/search', icon: 'Search' },
      ],
    },
    {
      label: 'My Account',
      items: [
        { title: 'Profile', path: '/profile', icon: 'User' },
        { title: 'Settings', path: '/settings', icon: 'Settings' },
        { title: 'Notifications', path: '/notifications', icon: 'Bell' },
        { title: 'Security', path: '/security', icon: 'Shield' },
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
  moderator: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Overview', path: '/dashboard', icon: 'Home' },
        { title: 'Messages', path: '/messages', icon: 'Inbox' },
        { title: 'Calendar', path: '/calendar', icon: 'Calendar' },
      ],
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
        {
          title: 'Content Management',
          path: '/moderator/content',
          icon: 'FileText',
        },
        { title: 'Activity Log', path: '/moderator/logs', icon: 'Activity' },
      ],
    },
    {
      label: 'My Account',
      items: [
        { title: 'Profile', path: '/profile', icon: 'User' },
        { title: 'Settings', path: '/settings', icon: 'Settings' },
        { title: 'Notifications', path: '/notifications', icon: 'Bell' },
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
  admin: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Overview', path: '/dashboard', icon: 'Home' },
        { title: 'Analytics', path: '/admin/analytics', icon: 'BarChart' },
        { title: 'Reports', path: '/admin/reports', icon: 'FileText' },
      ],
    },
    {
      label: 'Administration',
      items: [
        { title: 'User Management', path: '/admin/users', icon: 'Users' },
        { title: 'Role Management', path: '/admin/roles', icon: 'Shield' },
        { title: 'Content Control', path: '/admin/content', icon: 'FileCheck' },
        { title: 'System Settings', path: '/admin/system', icon: 'Settings' },
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
    {
      label: 'My Account',
      items: [
        { title: 'Profile', path: '/profile', icon: 'User' },
        { title: 'Settings', path: '/settings', icon: 'Settings' },
      ],
    },
  ],
  superAdmin: [
    {
      label: 'Dashboard',
      items: [
        { title: 'System Overview', path: '/root/dashboard', icon: 'Home' },
        { title: 'Analytics', path: '/root/analytics', icon: 'BarChart' },
        { title: 'Performance', path: '/root/performance', icon: 'Zap' },
      ],
    },
    {
      label: 'Super Admin',
      items: [
        { title: 'All Users', path: '/root/users', icon: 'Users' },
        { title: 'All Admins', path: '/root/admins', icon: 'ShieldCheck' },
        { title: 'System Config', path: '/root/config', icon: 'Cog' },
        { title: 'Database', path: '/root/database', icon: 'Database' },
        { title: 'Security', path: '/root/security', icon: 'Lock' },
        { title: 'Backups', path: '/root/backups', icon: 'HardDrive' },
      ],
    },
    {
      label: 'Administration',
      items: [
        { title: 'User Management', path: '/root/manage-users', icon: 'Users' },
        {
          title: 'Role Management',
          path: '/root/manage-roles',
          icon: 'Shield',
        },
        { title: 'Audit Logs', path: '/root/logs', icon: 'Activity' },
      ],
    },
    {
      label: 'My Account',
      items: [
        { title: 'Profile', path: '/profile', icon: 'User' },
        { title: 'Settings', path: '/settings', icon: 'Settings' },
      ],
    },
  ],
};

export type SidebarConfig = typeof SIDEBAR;
