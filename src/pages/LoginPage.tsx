import React from 'react';
import LayoutPage from '@/layoutPage';
import FormFieldGroup from '@/components/common/FormFieldGroup';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { AuthorizationProps } from '@/types/authorization';
import { AUTHORIZATION } from '@/fixtures/authorization.fixture';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/api/slices/authSlice';
import type { AppDispatch, RootState } from '@/api/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateLoginForm } from '@/hooks/authorization';
import { Card } from '@/components/ui/card';
import { addError } from '@/api/slices/errorSlice';

const LoginPage: React.FC<AuthorizationProps> = ({
  header = AUTHORIZATION.login.header,
  link = AUTHORIZATION.login.link,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formData);
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
        login({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      navigate('/explore');
    } catch (error) {
      console.log(error);
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
              placeholder="m@example.com"
              value={formData.email}
              onChange={value => handleChange('email', value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <FormFieldGroup
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={value => handleChange('password', value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            variant="orange"
            className="w-full mt-2 py-2"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        <p className="text-center text-sm mt-6">
          {link.text}
          <Link to={link.href} className="link font-medium">
            {link.linkText}
          </Link>
        </p>
      </Card>
    </LayoutPage>
  );
};

export default LoginPage;
