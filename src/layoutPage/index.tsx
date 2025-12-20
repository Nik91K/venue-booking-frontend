import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';
import AppSidebar from '@/components/layout/Sidebar';
import { Spinner } from '@/components/ui/spinner';
import { useAppSelector } from '@/api/hooks';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, error } = useAppSelector(state => state.auth);
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar
        username={user?.name || 'Guest'}
        role={user?.role || 'GUEST'}
        avatar={user?.avatarUrl || 'avatar'}
        email={user?.email || 'Guest'}
      />
      <SidebarInset>
        <div className="bg-(--primary-background) text-(--primary-text) flex min-h-screen flex-col">
          <Header
            username={user?.name || 'Guest'}
            role={user?.role || 'GUEST'}
            avatar={user?.avatarUrl || 'avatar'}
            email={user?.email || 'Guest'}
          />
          <main className="flex-1 max-w-7xl mx-auto px-4">{children}</main>
          <Footer role={user?.role || 'GUEST'} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutPage;
