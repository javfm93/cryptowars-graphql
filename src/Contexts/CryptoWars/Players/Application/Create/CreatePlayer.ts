import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { Nothing, Result, success } from '../../../../Shared/Aplication/Result';
import { BaseUseCase, UseCase } from '../../../../Shared/Domain/BaseUseCase';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Player } from '../../Domain/Player';
import { PlayerId } from '../../Domain/PlayerId';
import { PlayerName } from '../../Domain/PlayerName';
import { PlayerRepository } from '../../Domain/PlayerRepository';

type CreatePlayerArgs = {
  id: PlayerId;
  userId: UserId;
  name: PlayerName;
};

type CreatePlayerResult = Result<Nothing, DomainError>;

@UseCase()
export class CreatePlayer implements BaseUseCase<CreatePlayerArgs, Nothing> {
  constructor(private playerRepository: PlayerRepository, private eventBus: EventBus) {}

  async execute({ id, userId, name }: CreatePlayerArgs): Promise<CreatePlayerResult> {
    const user = Player.create(id, userId, name);
    await this.playerRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    return success();
  }
}
