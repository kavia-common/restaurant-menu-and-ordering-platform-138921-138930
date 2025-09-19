import { useCallback, useState } from 'react';

// PUBLIC_INTERFACE
export function useAsync<TArgs extends unknown[], TResult>(fn: (...args: TArgs) => Promise<TResult>) {
  /** Generic async hook to handle loading & error states for service calls. */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: TArgs) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fn(...args);
        return res;
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        setError(message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { run, loading, error };
}
