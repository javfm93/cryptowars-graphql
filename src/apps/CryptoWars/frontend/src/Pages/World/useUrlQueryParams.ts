import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useUrlQueryParams(param: string) {
  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  return queryParams.get(param);
}
