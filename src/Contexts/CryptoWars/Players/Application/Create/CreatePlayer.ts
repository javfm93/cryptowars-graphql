import { PlayerRepository } from '../../Domain/PlayerRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Player } from '../../Domain/Player';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { PlayerId } from '../../Domain/PlayerId';

type CreatePlayerArgs = {
  id: PlayerId;
  userId: UserId;
};

type CreatePlayerResult = Either<EmptyResult, DomainError>;

export class CreatePlayer implements UseCase<CreatePlayerArgs, EmptyResult> {
  constructor(private playerRepository: PlayerRepository, private eventBus: EventBus) {}

  async execute({ id, userId }: CreatePlayerArgs): Promise<CreatePlayerResult> {
    const user = Player.create(id, { userId });
    await this.playerRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    return success();
  }
}
