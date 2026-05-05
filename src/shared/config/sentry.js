import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [],
      tracesSampleRate: 0.1,
      environment: import.meta.env.VITE_VERCEL_ENV || 'development'
    });
  }
};
