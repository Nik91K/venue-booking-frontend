import * as Sentry from '@sentry/react';

type LoggerUser = {
  id: string;
  email?: string;
  username?: string;
};

type LogContext = Record<string, any>;

export const logError = (
  message: string,
  error?: unknown,
  context?: LogContext
): void => {
  console.error(message, error);

  if (error instanceof Error) {
    Sentry.captureException(error, {
      extra: {
        message,
        ...context,
      },
      level: 'error',
    });
  } else {
    Sentry.captureException(new Error(message), {
      extra: {
        originalError: error,
        ...context,
      },
      level: 'error',
    });
  }
};

export const logWarning = (message: string, context?: LogContext): void => {
  console.warn(message, context);

  Sentry.captureMessage(message, {
    level: 'warning',
    extra: context,
  });
};

export const logInfo = (message: string, context?: LogContext): void => {
  console.info(message, context);

  if (context) {
    Sentry.logger.info(message, context);
  } else {
    Sentry.logger.info(message);
  }
};

export const setUser = (user: LoggerUser | null): void => {
  Sentry.setUser(user);
};

export const setContext = (name: string, context: LogContext): void => {
  Sentry.setContext(name, context);
};

export const addBreadcrumb = (
  message: string,
  category: string = 'user-action',
  data?: LogContext
): void => {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
  });
};

export const logger = {
  error: logError,
  warn: logWarning,
  warning: logWarning,
  info: logInfo,
  setUser,
  setContext,
  addBreadcrumb,
} as const;
