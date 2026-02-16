export type ErrorType = 'error' | 'warning' | 'info';

export type UserError = {
  id: number;
  title: string;
  message: string;
  type: ErrorType;
};

export type CreateUserError = Omit<UserError, 'id'>;
