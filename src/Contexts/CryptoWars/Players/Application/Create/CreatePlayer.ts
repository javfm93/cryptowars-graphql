import { PlayerRepository } from '../../Domain/PlayerRepository';
import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Player } from '../../Domain/Player';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Result, Nothing, success } from '../../../../Shared/Aplication/Result';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { PlayerId } from '../../Domain/PlayerId';

type CreatePlayerArgs = {
  id: PlayerId;
  userId: UserId;
};

type CreatePlayerResult = Result<Nothing, DomainError>;

@UseCase()
export class CreatePlayer implements BaseUseCase<CreatePlayerArgs, Nothing> {
  constructor(private playerRepository: PlayerRepository, private eventBus: EventBus) {}

  async execute({ id, userId }: CreatePlayerArgs): Promise<CreatePlayerResult> {
    const user = Player.create(id, { userId });
    await this.playerRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    return success();
  }
}
