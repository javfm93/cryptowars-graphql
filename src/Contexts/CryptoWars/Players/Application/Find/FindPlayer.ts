import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { Player } from '../../Domain/Player';
import { PlayerRepository } from '../../Domain/PlayerRepository';
import { PlayerNotFound } from './PlayerNotFound';
import { UserId } from '../../../../IAM/Users/Domain/UserId';

export type FindPlayerErrors = PlayerNotFound;
type FindPlayerResult = Result<Player, FindPlayerErrors>;

type FindPlayerArgs = {
  userId: UserId;
  retrieveRelations: boolean;
};

@UseCase()
export class FindPlayer implements BaseUseCase<FindPlayerArgs, Player> {
  constructor(private playerRepository: PlayerRepository) {}

  async execute({ userId, retrieveRelations }: FindPlayerArgs): Promise<FindPlayerResult> {
    const player = await this.playerRepository.findByUserId(userId, { retrieveRelations });
    return player ? successAndReturn(player) : failure(new PlayerNotFound());
  }
}
