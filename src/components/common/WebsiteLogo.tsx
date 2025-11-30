import type { WebsiteLogoProps } from '@/types/common';
import { Link } from 'react-router-dom';
import React from 'react';

const WebsiteLogo: React.FC<WebsiteLogoProps> = ({
  image,
  imageTitle,
  imageLink,
}) => {
  return (
    <Link to={imageLink || '/'}>
      <img src={image} alt={imageTitle} className="rounded-full w-15 h-15" />
    </Link>
  );
};

export default WebsiteLogo;
