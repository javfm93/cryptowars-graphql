import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { PlayerId } from './PlayerId';
import { Either, successAndReturn } from '../../../Shared/Aplication/Result';
import { DomainError } from '../../Users/Domain/Errors/DomainError';
import { UserId } from '../../Users/Domain/UserId';

export interface UserPrimitives {
  userId: string;
}

export class Player extends AggregateRoot<void> {
  private constructor(id: UserId) {
    super(id);
  }

  public static create(id: PlayerId): Player {
    const player = new Player(id);
    player.record(
      new PlayerCreatedDomainEvent({
        id: player.id.toString()
      })
    );
    return player;
  }

  toPrimitives(): UserPrimitives {
    return {
      userId: this.id.toString()
    };
  }

  static fromPrimitives(plainData: UserPrimitives): Either<Player, DomainError> {
    return successAndReturn(new Player(UserId.create(plainData.userId)));
  }
}
