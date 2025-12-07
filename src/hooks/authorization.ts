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
