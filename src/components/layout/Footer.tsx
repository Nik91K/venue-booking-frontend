import React from 'react';
import { FOOTER } from '@/fixtures/footer.fixture';
import type { FooterProps } from '@/types/footer';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import WebsiteLogo from '../common/WebsiteLogo';

const Footer: React.FC<FooterProps> = ({
  image = FOOTER.image,
  imageTitle = FOOTER.imageTitle,
  imageLink = FOOTER.imageLink,
  quickLinks = FOOTER.quickLinks,
}) => {
  return (
    <footer className="flex justify-around items-center border-t p-2">
      <div>
        <WebsiteLogo
          image={image}
          imageTitle={imageTitle}
          imageLink={imageLink}
        />
      </div>
      <div>
        <ul className="flex gap-5">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="link">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          title="Register"
          className="cursor-pointer bg-(--third-background) hover:bg-white text-(--secondary-color) px-6 py-3 text-lg"
        >
          Register
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
