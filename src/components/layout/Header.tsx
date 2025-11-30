import React from 'react';
import { HEADER } from '@/fixtures/header.fixture';
import type { HeaderConfig } from '@/types/header';
import type { Role } from '@/types/common';
import { Link } from 'react-router-dom';
import WebsiteLogo from '../common/WebsiteLogo';

type HeaderProps = {
  role?: Role;
};

const Header: React.FC<HeaderProps> = ({ role = 'guest' }) => {
  const config: HeaderConfig = HEADER[role];

  return (
    <header className="flex items-center gap-4 p-4 border-b justify-around sticky">
      <div className="flex items-center gap-4">
        <WebsiteLogo
          image={config.image}
          imageLink={config.imageLink}
          imageTitle={config.imageTitle}
        />
        <p>{config.message}</p>
      </div>
      <div>
        <nav>
          <ul className="flex items-center gap-5">
            {config.links?.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="link">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
