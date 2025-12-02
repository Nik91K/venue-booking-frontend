import type { LucideIcon } from 'lucide-react';

export type SidebarSection = {
  label: string;
  items: Array<{
    title: string;
    path: string;
    icon: string;
  }>;
};

type MenuItem = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
};

export type MenuSection = {
  items?: MenuItem[];
  separator?: boolean;
};
