import React from 'react';
import { HEADER } from '@/fixtures/header.fixture';
import type { HeaderConfig } from '@/types/header';
import { Link } from 'react-router-dom';
import WebsiteLogo from '../common/WebsiteLogo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { USER_MENU } from '@/fixtures/sidebar.fixture';
import DropdownMenuItems from '../common/DropwnMenu';
import type { Role } from '@/types/common';
import { logout } from '@/api/slices/authSlice';
import { useAppDispatch } from '@/api/hooks';

type HeaderProps = {
  username: string;
  role: Role;
  avatar: string;
  email: string;
};

const Header: React.FC<HeaderProps> = ({ username, role, avatar, email }) => {
  const config: HeaderConfig = HEADER[role];

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className={`flex items-center gap-4 p-4 border-b justify-around sticky top-0 ${config.backgroundColor || 'bg-(--primary-background)'} text-(--primary-text) z-10`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger size="lg" />
        <WebsiteLogo
          image={config.image}
          imageLink={config.imageLink}
          imageTitle={config.imageTitle}
        />
      </div>
      <div>
        {role == 'GUEST' ? (
          <Button variant={'secondary'} asChild>
            <Link to={'/login'}>Login</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={avatar}
                alt="user avatar"
                className="w-13 h-13 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                    <img src={avatar} alt="user avatar" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{username}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItems items={USER_MENU} />
              <Button className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
