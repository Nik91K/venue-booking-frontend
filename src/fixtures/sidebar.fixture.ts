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
  FileCheck,
  Users,
  BarChart,
  Search,
  MessageSquare,
  Mail,
  ShoppingBasket,
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
      label: 'Moderation',
      items: [
        {
          title: 'Review Queue',
          path: '/establishment/reviews',
          icon: FileCheck,
        },
      ],
    },
  ],
  OWNER: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: Home },
        { title: 'Browse Services', path: '/explore', icon: Search },
      ],
    },
    {
      label: 'Moderation',
      items: [
        {
          title: 'Review Queue',
          path: '/establishment/reviews',
          icon: FileCheck,
        },
      ],
    },
    {
      label: 'Establishmens',
      items: [
        {
          title: 'Establishment Review',
          path: '/owner/establishmes',
          icon: FileCheck,
        },
      ],
    },
  ],
  SUPER_ADMIN: [
    {
      label: 'Explore',
      items: [
        { title: 'Home', path: '/', icon: Home },
        { title: 'Browse Services', path: '/explore', icon: Search },
      ],
    },
    {
      label: 'Dashboard',
      items: [
        { title: 'Admin Dashboard', path: '/admin/dashboard', icon: BarChart },
        { title: 'User Dashboard', path: '/admin/user', icon: Users },
        {
          title: 'Establishments Dashboard',
          path: '/admin/establishments',
          icon: ShoppingBasket,
        },
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
