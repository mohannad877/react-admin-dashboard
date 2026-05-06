import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './application/contexts/ThemeContext';
import { TenantProvider } from './application/contexts/TenantProvider';
import { AuthProvider } from './application/contexts/AuthContext';
import { initSentry } from './shared/config/sentry';
import './shared/config/i18n';
import App from './App';
import './index.css';

initSentry();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <TenantProvider>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </TenantProvider>
    </HelmetProvider>
  </React.StrictMode>
);
