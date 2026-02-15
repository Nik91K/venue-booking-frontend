import React from 'react';
import { HEADER } from '@fixtures/header.fixture';
import type { HeaderConfig } from '@/types/header';
import { Link } from 'react-router-dom';
import WebsiteLogo from '@components/common/WebsiteLogo';
import { SidebarTrigger } from '@components/ui/sidebar';
import { Button } from '@components/ui/button';
import type { Role } from '@/types/common';
import UserDropdownMenu from '@components/common/UserDropdownMenu';

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
      className={`flex items-center gap-4 p-4 border-b justify-around sticky top-0 ${config.backgroundColor || 'bg-(--primary-background)'} text-(--primary-text) z-10`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger size="lg" className="cursor-pointer" />
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
          <UserDropdownMenu avatar={avatar} username={username} email={email} />
        )}
      </div>
    </header>
  );
};

export default Header;
