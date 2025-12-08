import React from 'react';
import LayoutPage from '@/layoutPage';
import FormFieldGroup from '@/components/common/FormFieldGroup';
import { Button } from '@/components/ui/button';
import { MailIcon, KeyRound, User } from 'lucide-react';
import { useState } from 'react';
import {
  validatePassword,
  validateEmail,
  validateUsername,
} from '@/hooks/authorization';
import { Link } from 'react-router-dom';
import type { AuthorizationProps } from '@/types/authorization';
import { AUTHORIZATION } from '@/fixtures/authorization.fixture';

const RegisterPage: React.FC<AuthorizationProps> = ({
  header = AUTHORIZATION.registration.header,
  link = AUTHORIZATION.registration.link,
}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateUsername(formData.username)) {
      newErrors.username = 'Incorrect username';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Incorrect email';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Incorrect password';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.values(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    console.log(true);
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
          <Button type="submit" variant="orange" className="w-full mt-4">
            Create Account
          </Button>
        </form>
        <p className="text-center text-sm">
          {link.text}{' '}
          <Link to={link.href} className="link">
            {link.linkText}
          </Link>
        </p>
      </div>
    </LayoutPage>
  );
};

export default RegisterPage;
