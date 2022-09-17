import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { Player } from '../../Domain/Player';
import { PlayerRepository } from '../../Domain/PlayerRepository';
import { PlayerId } from '../../Domain/PlayerId';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { PlayerNotFound } from './PlayerNotFound';
import { UserId } from '../../../Users/Domain/UserId';

type FindPlayerResult = Either<Player, DomainError>;

export class FindPlayer implements UseCase<PlayerId, Player> {
  constructor(private playerRepository: PlayerRepository) {}

  async execute(userId: UserId): Promise<FindPlayerResult> {
    const player = await this.playerRepository.findByUserId(userId);
    return player ? successAndReturn(player) : failure(new PlayerNotFound());
  }
}
