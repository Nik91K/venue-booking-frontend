import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-(--primary-background) text-(--primary-text) flex min-h-screen flex-col">
      <Header role="guest" />
      <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
