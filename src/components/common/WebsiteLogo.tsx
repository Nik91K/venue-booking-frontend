import type { WebsiteLogoProps } from '@/types/common';
import { Link } from 'react-router-dom';
import React from 'react';

const WebsiteLogo: React.FC<WebsiteLogoProps> = ({
  image,
  imageTitle,
  imageLink,
}) => {
  return (
    <Link
      to={imageLink || '/'}
      className="flex items-center shrink-0"
      aria-label={`${imageTitle} - Go to homepage`}
    >
      <img
        src={image}
        alt={imageTitle}
        className="w-10 h-10 rounded-full object-cover"
        onError={e => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </Link>
  );
};

export default WebsiteLogo;
