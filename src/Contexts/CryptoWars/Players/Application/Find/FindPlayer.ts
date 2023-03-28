import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { Player } from '../../Domain/Player';
import { PlayerRepository } from '../../Domain/PlayerRepository';
import { PlayerNotFound } from './PlayerNotFound';
import { UserId } from '../../../../IAM/Users/Domain/UserId';

export type FindPlayerErrors = PlayerNotFound;
type FindPlayerResult = Either<Player, FindPlayerErrors>;

type FindPlayerArgs = {
  userId: UserId;
  retrieveRelations: boolean;
};

@RegisterUseCase()
export class FindPlayer implements UseCase<FindPlayerArgs, Player> {
  constructor(private playerRepository: PlayerRepository) {}

  async execute({ userId, retrieveRelations }: FindPlayerArgs): Promise<FindPlayerResult> {
    const player = await this.playerRepository.findByUserId(userId, { retrieveRelations });
    return player ? successAndReturn(player) : failure(new PlayerNotFound());
  }
}
