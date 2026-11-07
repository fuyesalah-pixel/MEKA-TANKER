import { useCallback, useEffect, useState } from 'react';
import { api } from './api.js';

export function useFetch(path, { skip = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (skip) return;
    setLoading(true);
    setError(null);
    try {
      const result = await api.get(path);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, skip]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
