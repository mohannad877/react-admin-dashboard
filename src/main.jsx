import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './application/contexts/ThemeContext';
import { TenantProvider } from './application/contexts/TenantProvider';
import { initSentry } from './shared/config/sentry';
import './shared/config/i18n';

initSentry();
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TenantProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TenantProvider>
  </React.StrictMode>
);
