import React from 'react';
import LayoutPage from '@/layoutPage';
import FormFieldGroup from '@/components/common/forms/FormFieldGroup';
import { Button } from '@components/ui/button';
import { useState } from 'react';
import type { AuthorizationProps } from '@/types/authorization';
import { AUTHORIZATION } from '@fixtures/authorization.fixture';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@api/slices/authSlice';
import type { AppDispatch, RootState } from '@api/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateLoginForm } from '@hooks/validation/authorization';
import { Card } from '@components/ui/card';
import { addError } from '@api/slices/errorSlice';
import { Eye, EyeOff, KeyRound, MailIcon } from 'lucide-react';

const LoginPage: React.FC<AuthorizationProps> = ({
  header = AUTHORIZATION.login.header,
  link = AUTHORIZATION.login.link,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formData);

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
        login({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      navigate('/explore');
    } catch (error: any) {
      dispatch(
        addError({
          title: 'Login Failed',
          message: error.message || 'Invalid email or password',
          type: 'error',
        })
      );
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <LayoutPage>
      <div className="flex justify-center items-start min-h-[calc(100vh-12rem)]">
        <Card className="p-6 my-10 w-full max-w-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{header.title}</h2>
            <p className="mt-2 text-gray-500">{header.text}</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full grid gap-4">
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            <FormFieldGroup
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={value => handleChange('email', value)}
              leftIcon={<MailIcon />}
            />
            <FormFieldGroup
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={value => handleChange('password', value)}
              leftIcon={<KeyRound />}
              rightIcon={showPassword ? <EyeOff /> : <Eye />}
              onRightIconClick={() => setShowPassword(prev => !prev)}
              description="At least 8 characters, including a number, an uppercase letter, and a special character."
            />
            <Button
              type="submit"
              variant="orange"
              className="w-full mt-2 py-2"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
          <p className="text-center text-sm mt-1 text-gray-500">
            {link.text}{' '}
            <Link to={link.href} className="link font-medium">
              {link.linkText}
            </Link>
          </p>
        </Card>
      </div>
    </LayoutPage>
  );
};

export default LoginPage;
