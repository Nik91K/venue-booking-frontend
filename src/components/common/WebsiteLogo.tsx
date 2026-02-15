import type { WebsiteLogoProps } from '@/types/common';
import { Link } from 'react-router-dom';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Skeleton } from '@components/ui/skeleton';

const WebsiteLogo: React.FC<WebsiteLogoProps> = ({
  image,
  imageTitle,
  imageLink,
}) => {
  return (
    <Link to={imageLink || '/'}>
      <Avatar className="w-10 h-10">
        <AvatarImage src={image} alt={imageTitle} />
        <AvatarFallback className="p-0">
          <Skeleton className="w-full h-full rounded-full" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default WebsiteLogo;
