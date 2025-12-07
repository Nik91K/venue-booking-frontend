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

const RegisterForm = () => {
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
    return Object.keys(newErrors).length === 0;
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
      <form onSubmit={handleSubmit}>
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
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
        <Button type="submit" className="w-full mt-4">
          Create Account
        </Button>
      </form>
    </LayoutPage>
  );
};

export default RegisterForm;
