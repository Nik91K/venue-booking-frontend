import React from 'react';
import LayoutPage from '@/layoutPage';
import FormFieldGroup from '@/components/common/forms/FormFieldGroup';
import { Button } from '@/components/ui/button';
import { MailIcon, KeyRound, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthorizationProps } from '@/types/authorization';
import { AUTHORIZATION } from '@fixtures/authorization.fixture';
import { register } from '@api/slices/authSlice';
import type { AppDispatch, RootState } from '@api/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateRegistrationForm } from '@hooks/validation/authorization';
import { Card } from '@components/ui/card';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import PasswordStrength from '@components/common/PasswordStrength';

const RegisterPage: React.FC<AuthorizationProps> = ({
  header = AUTHORIZATION.registration.header,
  link = AUTHORIZATION.registration.link,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateRegistrationForm(formData);
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
        })
      ).unwrap();
      navigate('/explore');
    } catch (error: any) {
      dispatch(addError(convertError(error)));
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
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={value => handleChange('username', value)}
              leftIcon={<User />}
            />
            <FormFieldGroup
              type="text"
              placeholder="+380680000000"
              value={formData.phone}
              onChange={value => handleChange('phone', value)}
              leftIcon={<Phone />}
            />
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

            <PasswordStrength password={formData.password} />
            <FormFieldGroup
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={value => handleChange('confirmPassword', value)}
              leftIcon={<KeyRound />}
              rightIcon={showConfirm ? <EyeOff /> : <Eye />}
              onRightIconClick={() => setShowConfirm(prev => !prev)}
            />
            <Button
              type="submit"
              variant="orange"
              className="w-full mt-4"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
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

export default RegisterPage;
