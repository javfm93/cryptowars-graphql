import { handleQueryResult } from '@/contexts/shared/application/query';
import { PlayerTownsQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';
import { useEffect, useState } from 'react';
import { TownRepository } from '../../domain/TownRepository';

export const useTowns = (repository: TownRepository) => {
  const [result, setResult] = useState<PlayerTownsQuery['GetPlayerTowns']>();
  const [domainError, setError] = useState<UnexpectedError>();

  useEffect(() => {
    repository.getTowns().then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value);
    });

  }, [repository]);

  return handleQueryResult(result, domainError);
};


