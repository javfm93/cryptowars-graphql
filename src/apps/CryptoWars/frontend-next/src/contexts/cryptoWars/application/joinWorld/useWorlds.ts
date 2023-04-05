import { handleQueryResult } from '@/contexts/shared/application/query';
import { JoinWorldPageQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';
import { useEffect, useState } from 'react';
import { WorldRepository } from '../../domain/WorldRepository';

export const useWorlds = (repository: WorldRepository) => {
  const [result, setResult] = useState<JoinWorldPageQuery['GetWorlds']>();
  const [domainError, setError] = useState<UnexpectedError>();

  useEffect(() => {
    repository.getWorlds().then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value);
    });

  }, [repository]);

  return handleQueryResult(result, domainError);
};