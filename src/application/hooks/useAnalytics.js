import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export function useAnalytics(trackingId) {
  const location = useLocation();

  useEffect(() => {
    if (trackingId && import.meta.env.PROD) {
      ReactGA.initialize(trackingId);
    }
  }, [trackingId]);

  useEffect(() => {
    if (trackingId && import.meta.env.PROD) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location, trackingId]);
}
