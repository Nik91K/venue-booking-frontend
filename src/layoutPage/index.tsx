import React from 'react';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="flex min-h-screen min-w-7xl">{children}</main>
    </div>
  );
};

export default LayoutPage;
