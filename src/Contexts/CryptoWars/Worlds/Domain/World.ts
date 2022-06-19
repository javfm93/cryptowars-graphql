import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { WorldId } from './WorldId';
import { WorldName } from './WorldName';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { DomainError } from '../../Users/Domain/Errors/DomainError';

export interface WorldProps {
  name: WorldName;
}

export interface WorldPrimitives {
  id: string;
  name: string;
}

export class World extends AggregateRoot<WorldProps> {
  private constructor(id: WorldId, props: WorldProps) {
    super(id, props);
  }

  public static create(id: WorldId, props: WorldProps): World {
    return new World(id, props);
  }

  toPrimitives(): WorldPrimitives {
    return {
      id: this.id.toString(),
      name: this.props.name.toString()
    };
  }

  static fromPrimitives(plainData: WorldPrimitives): Either<World, DomainError> {
    const nameCreation = WorldName.create(plainData.name);
    if (nameCreation.isFailure()) return failure(nameCreation.value);
    return successAndReturn(new World(WorldId.create(plainData.id), { name: nameCreation.value }));
  }
}
