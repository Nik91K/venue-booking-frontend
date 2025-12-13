import React from 'react';
import LayoutPage from '@/layoutPage';
import FormFieldGroup from '@/components/common/FormFieldGroup';
import { Button } from '@/components/ui/button';
import { MailIcon, KeyRound, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthorizationProps } from '@/types/authorization';
import { AUTHORIZATION } from '@/fixtures/authorization.fixture';
import { register } from '@/api/slices/authSlice';
import type { AppDispatch, RootState } from '@/api/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateRegistrationForm } from '@/hooks/authorization';

const RegisterPage: React.FC<AuthorizationProps> = ({
  header = AUTHORIZATION.registration.header,
  link = AUTHORIZATION.registration.link,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateRegistrationForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await dispatch(
        register({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'USER',
        })
      ).unwrap();
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <LayoutPage>
      <div className="flex items-center flex-col min-h-screen py-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{header.title}</h2>
          <p className="mt-2">{header.text}</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-1">
          <FormFieldGroup
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={value => handleChange('username', value)}
            icon={<User />}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
          <FormFieldGroup
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={value => handleChange('email', value)}
            icon={<MailIcon />}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <FormFieldGroup
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={value => handleChange('password', value)}
            icon={<KeyRound />}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <FormFieldGroup
            type="password"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={value => handleChange('confirmPassword', value)}
            icon={<KeyRound />}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          <Button
            type="submit"
            variant="orange"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        <p className="text-center text-sm">
          {link.text}
          <Link to={link.href} className="link">
            {link.linkText}
          </Link>
        </p>
      </div>
    </LayoutPage>
  );
};

export default RegisterPage;
