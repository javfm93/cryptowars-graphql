import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { WorldId } from './WorldId';
import { WorldName } from './WorldName';

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

  static fromPrimitives(plainData: WorldPrimitives): World {
    const name = new WorldName(plainData.name);
    return new World(WorldId.create(plainData.id), { name });
  }
}
