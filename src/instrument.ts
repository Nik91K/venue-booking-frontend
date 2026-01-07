import * as Sentry from '@sentry/react';
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  tracesSampleRate: 0.1,
  release: 'my-app@1.0.0',
  ignoreErrors: ['ResizeObserver loop limit exceeded'],
  beforeSend(event) {
    if (event.request?.url?.includes('adservice.com')) return null;
    return event;
  },
});
