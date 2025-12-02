import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { SIDEBAR_MENU } from '@/fixtures/sidebar.fixture';
import type { MenuSection } from '@/types/sidebat';

const DropdownMenuSitebar: React.FC<MenuSection> = ({
  items = SIDEBAR_MENU.items,
  separator = false,
}) => {
  return (
    <>
      {items.map((items, index) => (
        <DropdownMenuItem key={index}>
          <span>{items.label}</span>
        </DropdownMenuItem>
      ))}
      {separator && <DropdownMenuSeparator />}
    </>
  );
};

export default DropdownMenuSitebar;
