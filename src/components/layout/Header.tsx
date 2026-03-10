import React from 'react';
import { HEADER } from '@fixtures/header.fixture';
import type { HeaderConfig } from '@/types/header';
import { Link } from 'react-router-dom';
import WebsiteLogo from '@components/common/WebsiteLogo';
import { SidebarTrigger } from '@components/ui/sidebar';
import { Button } from '@components/ui/button';
import type { Role } from '@/types/common';
import UserDropdownMenu from '@components/common/UserDropdownMenu';
import RoleBadge from '@components/common/RoleBadge';

type HeaderProps = {
  username: string;
  role: Role;
  avatar: string;
  email: string;
};

const Header: React.FC<HeaderProps> = ({ username, role, avatar, email }) => {
  const config: HeaderConfig = HEADER[role];

  return (
    <header
      className="
        flex items-center gap-4 px-4 border-b justify-between
        sticky top-0 z-10 min-h-[64px]
        backdrop-blur-sm bg-[var(--primary-background)]/90
        text-[var(--primary-text)]
      "
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger
          size="lg"
          className="cursor-pointer"
          aria-label="Toggle navigation sidebar"
        />
        <WebsiteLogo
          image={config.image}
          imageLink={config.imageLink}
          imageTitle={config.imageTitle}
        />
      </div>

      <div className="flex items-center gap-3">
        {role === 'GUEST' ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link to="/register">Register</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </>
        ) : (
          <>
            <RoleBadge role={role} />
            <UserDropdownMenu
              avatar={avatar}
              username={username}
              email={email}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
