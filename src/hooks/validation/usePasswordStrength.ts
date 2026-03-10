export function usePasswordStrength(password: string) {
  if (!password) return;
  let score = 0;
  if (password.length >= 5) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) {
    return { score, label: 'Weak', color: 'bg-red-500' };
  }
  if (score <= 2) {
    return { score, label: 'Fair', color: 'bg-orange-400' };
  }
  if (score <= 3) {
    return { score, label: 'Good', color: 'bg-yellow-400' };
  }
  return { score, label: 'Strong', color: 'bg-green-500' };
}
