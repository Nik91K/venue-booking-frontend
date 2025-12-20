function noEmoji(data: string): boolean {
  return /^[A-Za-z0-9!@#$%^&*]+$/.test(data);
}

export function validateUsername(data: string): boolean {
  return data.length >= 2 && noEmoji(data);
}

export function validatePassword(data: string): boolean {
  return (
    data.length >= 8 &&
    data.length <= 32 &&
    /[0-9]/.test(data) &&
    /[A-Z]/.test(data) &&
    noEmoji(data)
  );
}

export function validateEmail(data: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
}

export function validatePhone(data: string): boolean {
  return /^\+380\d{9}$/.test(data.trim());
}

export const validateLoginForm = (formData: {
  email: string;
  password: string;
}) => {
  const newErrors: Record<string, string> = {};

  if (!validateEmail(formData.email)) {
    newErrors.email = 'Incorrect email';
  }

  if (!validatePassword(formData.password)) {
    newErrors.password = 'Incorrect password';
  }

  return newErrors;
};

export const validateRegistrationForm = (formData: {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const newErrors: Record<string, string> = {};

  if (!validateUsername(formData.username)) {
    newErrors.username = 'Incorrect username';
  }

  if (!validatePhone(formData.phone)) {
    newErrors.phone = 'Incorrect phone number';
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

  return newErrors;
};
