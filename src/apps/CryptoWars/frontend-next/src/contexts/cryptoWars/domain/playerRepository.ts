import { Result } from '@/contexts/shared/application/result';
import { HomePagePlayerQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';

export abstract class PlayerRepository {
  abstract home(): Promise<Result<HomePagePlayerQuery["GetPlayer"], UnexpectedError>>;
}

export type HomePagePlayer = {
  towns: HomePagePlayerTown[];
};

export type HomePagePlayerTown = {
  id: string;
}
