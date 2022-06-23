import { PlayerRepository } from '../../Domain/PlayerRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Player } from '../../Domain/Player';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { UserId } from '../../../Users/Domain/UserId';
import { DomainError } from '../../../Users/Domain/Errors/DomainError';

type CreatePlayerArgs = {
  userId: UserId;
};

type CreatePlayerResult = Either<EmptyResult, DomainError>;

export class CreatePlayer implements UseCase<CreatePlayerArgs, EmptyResult> {
  constructor(private playerRepository: PlayerRepository, private eventBus: EventBus) {}

  async execute({ userId }: CreatePlayerArgs): Promise<CreatePlayerResult> {
    const user = Player.create(userId);
    await this.playerRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    return success();
  }
}
