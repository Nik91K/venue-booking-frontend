import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';
import AppSidebar from '@/components/layout/Sidebar';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar role="guest" />
      <SidebarInset>
        <div className="bg-(--primary-background) text-(--primary-text) flex min-h-screen flex-col">
          <Header role="admin" />
          <main className="flex-1 max-w-7xl mx-auto px-4">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutPage;
