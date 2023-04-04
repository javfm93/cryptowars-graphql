import { handleQueryResult } from '@/contexts/shared/application/query';
import { HomePagePlayerQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';
import { useEffect, useState } from 'react';
import { PlayerRepository } from '../../domain/playerRepository';

export const useHomePagePlayer = (repository: PlayerRepository) => {
  const [result, setResult] = useState<HomePagePlayerQuery['GetPlayer']>();
  const [domainError, setError] = useState<UnexpectedError>();

  useEffect(() => {
    repository.home().then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value);
    });

  }, [repository]);

  return handleQueryResult(result, domainError);
};


