import type { Role } from '@/types/common';
import type {
  MenuSection,
  SidebarSection,
  UserMenuItems,
} from '@/types/sidebat';
import {
  CreditCard,
  Settings,
  Home,
  User,
  FileCheck,
  AlertTriangle,
  Activity,
  Shield,
  Users,
  FileText,
  BarChart,
  Search,
  MessageSquare,
  Mail,
} from 'lucide-react';

export const SIDEBAR: Record<Role, SidebarSection[]> = {
  GUEST: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: Home },
        { title: 'Browse Services', path: '/explore', icon: Search },
      ],
    },
  ],
  USER: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: Home },
        { title: 'Browse Services', path: '/explore', icon: Search },
      ],
    },
  ],
  MODERATOR: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: Home },
        { title: 'Browse Services', path: '/explore', icon: Search },
      ],
    },
    {
      label: 'Dashboard',
      items: [{ title: 'Overview', path: '/dashboard', icon: Home }],
    },
    {
      label: 'Moderation',
      items: [
        {
          title: 'Review Queue',
          path: '/moderator/reviews',
          icon: FileCheck,
        },
        {
          title: 'User Reports',
          path: '/moderator/reports',
          icon: AlertTriangle,
        },
      ],
    },
  ],
  OWNER: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Overview', path: '/admin/dashboard', icon: Home },
        { title: 'Analytics', path: '/admin/analytics', icon: BarChart },
        { title: 'Reports', path: '/admin/reports', icon: FileText },
      ],
    },
    {
      label: 'Administration',
      items: [
        { title: 'User Management', path: '/admin#users', icon: Users },
        { title: 'Role Management', path: '/admin#roles', icon: Shield },
        { title: 'Content Control', path: '/admin#content', icon: FileCheck },
        { title: 'System Settings', path: '/admin#system', icon: Settings },
        { title: 'Audit Logs', path: '/admin/logs', icon: Activity },
      ],
    },
    {
      label: 'Moderation',
      items: [
        { title: 'Review Queue', path: '/admin/reviews', icon: FileCheck },
        {
          title: 'User Reports',
          path: '/admin/reports',
          icon: AlertTriangle,
        },
      ],
    },
  ],
  SUBER_ADMIN: [
    {
      label: 'Dashboard',
      items: [
        { title: 'Admin Dashboard', path: '/admin/dashboard', icon: Home },
        { title: 'User Dashboard', path: '/admin/user', icon: User },
      ],
    },
  ],
};

export type SidebarConfig = typeof SIDEBAR;

export const USER_MENU: MenuSection = [
  { icon: CreditCard, label: 'Billing', path: '/billing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const SIDEBAR_FOOTER: UserMenuItems[] = [
  { label: 'Support', path: '/support', icon: Mail },
  { label: 'Feedback', path: '/feedback', icon: MessageSquare },
];
