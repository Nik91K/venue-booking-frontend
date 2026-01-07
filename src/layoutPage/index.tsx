import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React, { useEffect } from 'react';
import AppSidebar from '@/components/layout/Sidebar';
import { Spinner } from '@/components/ui/spinner';
import { useAppSelector, useAppDispatch } from '@/api/hooks';
import { getCurrentUser } from '@/api/slices/authSlice';
import { addError } from '@/api/slices/errorSlice';
import { convertError } from '@/hooks/logger/errorConverter';
import ErrorComponent from '@/components/common/ErrorComponent';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, loading, error, accessToken } = useAppSelector(
    state => state.auth
  );

  useEffect(() => {
    if (accessToken && !user && !loading) {
      dispatch(getCurrentUser());
    }
  }, [accessToken, user, loading, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  });

  if (loading) return <Spinner />;

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
          <main className="flex-1 max-w-7xl mx-auto px-4">
            <ErrorComponent />
            {children}
          </main>
          <Footer role={user?.role || 'GUEST'} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutPage;
