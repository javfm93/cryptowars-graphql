import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { Either, successAndReturn } from '../../../Shared/Aplication/Result';
import { UserId } from '../../Users/Domain/UserId';
import { PlayerId } from './PlayerId';
import { DomainError } from '../../Users/Domain/Errors/DomainError';

export interface PlayerProps {
  userId: UserId;
}

export interface PlayerPrimitives {
  id: string;
  userId: string;
}

export class Player extends AggregateRoot<PlayerProps> {
  private constructor(id: PlayerId, props: PlayerProps) {
    super(id, props);
  }

  get userId(): UserId {
    return this.props.userId;
  }

  public static create(id: PlayerId, props: PlayerProps): Player {
    const user = new Player(id, props);
    user.record(
      new PlayerCreatedDomainEvent({
        id: user.id.toString()
      })
    );
    return user;
  }

  toPrimitives(): PlayerPrimitives {
    return {
      id: this.id.toString(),
      userId: this.props.userId.toString()
    };
  }

  static fromPrimitives(plainData: PlayerPrimitives): Either<Player, DomainError> {
    const userId = UserId.create(plainData.userId);
    const id = PlayerId.create(plainData.id);
    return successAndReturn(new Player(id, { userId }));
  }
}
