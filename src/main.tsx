import '@/instrument.ts';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@api/store.ts';
import '@/index.css';
import ProtectedRoute from '@/guards/ProtectedRoute.tsx';
import App from '@/App.tsx';
import RegisterPage from '@pages/RegisterPage.tsx';
import LoginPage from '@pages/LoginPage.tsx';
import VenuesMapPage from '@pages/VenuesMapPage.tsx';
import AdminDashboard from '@pages/admin/AdminDashboard.tsx';
import AdminUsersPage from '@pages/admin/UserManagement.tsx';
import AdminEstablishmentsPage from '@pages/admin/EstablishmentsManagement.tsx';
import EstablishmentPage from '@pages/VenuePage.tsx';
import NotFoundPage from '@pages/NotFoundPage.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/explore" element={<VenuesMapPage />} />
        <Route path="/establishment/:id" element={<EstablishmentPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user" element={<AdminUsersPage />} />
          <Route path="establishments" element={<AdminEstablishmentsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
