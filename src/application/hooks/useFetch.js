import { useState, useEffect } from 'react';

export function useFetch(repository, method = 'getAll', deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (params = {}) => {
    setLoading(true); setError(null);
    try {
      const result = await repository[method](params);
      setData(result);
    } catch (err) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { execute(); }, deps);

  return { data, loading, error, refetch: execute };
}
