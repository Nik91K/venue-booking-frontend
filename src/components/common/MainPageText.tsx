import React from 'react';
import type { MainPageTextProps } from '@/types/mainPageText';

const TextComponent: React.FC<MainPageTextProps> = ({
  title,
  text,
  children,
}) => {
  return (
    <div className="grid gap-2 border-b text-center items-center">
      <div className="flex items-center justify-center">
        <span className="border-t w-full"></span>
        <p className="whitespace-nowrap m-3 text-2xl">{title}</p>
        <span className="border-t w-full"></span>
      </div>
      <div>
        <p className="text-lg">{text}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TextComponent;
