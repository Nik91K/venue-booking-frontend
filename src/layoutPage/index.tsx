import Footer from '@/components/layout/Footer';
import React from 'react';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-(--primaty-background) text-(--primary-text) flex min-h-screen flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
