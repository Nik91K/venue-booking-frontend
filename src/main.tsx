import '@/instrument.ts';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@api/store.ts';
import '@/index.css';
import ProtectedRoute from '@/guards/ProtectedRoute.tsx';
import MainPage from '@pages/MainPage';
import RegisterPage from '@pages/auth/RegisterPage';
import LoginPage from '@pages/auth/LoginPage';
import VenuesMapPage from '@pages/VenuesMapPage.tsx';
import AdminDashboard from '@pages/admin/AdminDashboard.tsx';
import AdminUsersPage from '@pages/admin/UserManagement.tsx';
import AdminEstablishmentsPage from '@pages/admin/EstablishmentsManagement.tsx';
import EstablishmentPage from '@pages/VenuePage.tsx';
import NotFoundPage from '@pages/NotFoundPage.tsx';
import OwnerDashboard from '@pages/owner/OwnerDashboard';
import SettingsPage from '@pages/SettingsPage';
import { ROLES } from '@/constants/roles';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/explore" element={<VenuesMapPage />} />
        <Route path="/establishment/:id" element={<EstablishmentPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<ProtectedRoute />}>
          <Route index element={<SettingsPage />} />
        </Route>
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]} />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user" element={<AdminUsersPage />} />
          <Route path="establishments" element={<AdminEstablishmentsPage />} />
        </Route>
        <Route
          path="/owner"
          element={<ProtectedRoute allowedRoles={[ROLES.OWNER]} />}
        >
          <Route index element={<OwnerDashboard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
