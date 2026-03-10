import React from 'react';
import { FOOTER } from '@fixtures/footer.fixture';
import type { FooterProps } from '@/types/footer';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';
import WebsiteLogo from '@components/common/WebsiteLogo';

const Footer: React.FC<FooterProps> = ({
  image = FOOTER.image,
  imageTitle = FOOTER.imageTitle,
  imageLink = FOOTER.imageLink,
  quickLinks = FOOTER.quickLinks,
  role,
}) => {
  const ctaLabel = role === 'GUEST' ? 'Register' : 'Settings';
  const ctaPath = role === 'GUEST' ? '/register' : '/settings';

  return (
    <footer className="border-t">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:px-6">
        <WebsiteLogo
          image={image}
          imageTitle={imageTitle}
          imageLink={imageLink}
        />

        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="link text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          title={ctaLabel}
          aria-label={ctaLabel}
          variant="secondary"
          size="lg"
          asChild
        >
          <Link to={ctaPath}>{ctaLabel}</Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
