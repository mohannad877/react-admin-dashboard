/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { switchLanguage } from '../../shared/config/i18n';

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [tenantKey, setTenantKey] = useState('alpha');

  useEffect(() => {
    // Read tenant from URL: ?tenant=alpha
    const params = new URLSearchParams(window.location.search);
    const key = params.get('tenant') || 'alpha';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTenantKey(key);

    fetch('/tenants.json')
      .then(res => res.json())
      .then(tenantsConfig => {
        const tenantConfig = tenantsConfig[key] || tenantsConfig.alpha;
        setConfig(tenantConfig);

        // Apply white-labeling
        document.documentElement.style.setProperty('--color-teal-500', tenantConfig.primaryColor);
        document.documentElement.style.setProperty('--color-teal-600', tenantConfig.primaryColor);
        
        // Initial language
        if (!params.has('lng')) {
          switchLanguage(tenantConfig.language);
        }
      })
      .catch(console.error);
  }, []);

  if (!config) return null; // loading state

  return (
    <TenantContext.Provider value={{ tenant: tenantKey, config }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
