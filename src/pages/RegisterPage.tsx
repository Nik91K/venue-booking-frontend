import React from 'react';
import LayoutPage from '@/layoutPage';
import FormFieldGroup from '@/components/common/FormFieldGroup';
import { Button } from '@/components/ui/button';
import { MailIcon, KeyRound, User, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthorizationProps } from '@/types/authorization';
import { AUTHORIZATION } from '@/fixtures/authorization.fixture';
import { register } from '@/api/slices/authSlice';
import type { AppDispatch, RootState } from '@/api/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateRegistrationForm } from '@/hooks/authorization';
import { Card } from '@/components/ui/card';
import { addError } from '@/api/slices/errorSlice';

const RegisterPage: React.FC<AuthorizationProps> = ({
  header = AUTHORIZATION.registration.header,
  link = AUTHORIZATION.registration.link,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateRegistrationForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([error, message]) => {
        dispatch(
          addError({
            title: `Validation Error: ${error}`,
            message,
            type: 'error',
          })
        );
      });
      return;
    }

    try {
      await dispatch(
        register({
          name: formData.username,
          phoneNumber: formData.phone,
          email: formData.email,
          password: formData.password,
          role: 'USER',
        })
      ).unwrap();
      navigate('/explore');
    } catch (error: any) {
      console.log(error.error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <LayoutPage>
      <Card className="p-6 my-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{header.title}</h2>
          <p className="mt-2 text-gray-500">{header.text}</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full grid gap-4">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          <div className="flex flex-col">
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
          </div>
          <div className="flex flex-col">
            <FormFieldGroup
              type="text"
              placeholder="+380680000000"
              value={formData.phone}
              onChange={value => handleChange('phone', value)}
              icon={<Phone />}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col">
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
          </div>
          <div className="flex flex-col">
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
          </div>
          <div className="flex flex-col">
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
          </div>
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
      </Card>
    </LayoutPage>
  );
};

export default RegisterPage;
