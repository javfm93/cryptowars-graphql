import { TownRepository } from "@/contexts/cryptoWars/domain/TownRepository";
import { handleQueryResult } from "@/contexts/shared/application/query";
import { PlayerTownHeaderQuery, UnexpectedError } from "@/contexts/shared/domain/__generated__/graphql";
import { useEffect, useState } from "react";

export type PlayerTownHeader = PlayerTownHeaderQuery["GetPlayerTown"]

export const usePlayerTownHeader = (repository: TownRepository, id: string) => {
  const [result, setResult] = useState<PlayerTownHeader>();
  const [domainError, setError] = useState<UnexpectedError>();

  useEffect(() => {
    repository.getTownHeader(id).then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value);
    });

  }, [repository, id]);

  return handleQueryResult(result, domainError);
}
