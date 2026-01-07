export type ErrorType = 'error' | 'warning' | 'info';

export type UserError = {
  title: string;
  message: string;
  type: ErrorType;
  action?: {
    label: string;
    onClick: () => void;
  };
};
