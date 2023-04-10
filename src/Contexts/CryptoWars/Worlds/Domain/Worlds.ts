import { Primitives } from '../../../Shared/Domain/Primitives';
import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { World } from './World';

export class Worlds extends WatchedList<World> {
  private constructor(initial: Array<World>) {
    super(initial);
  }

  public compareItems(a: World, b: World) {
    return a.isEqualTo(b);
  }

  public toPrimitives() {
    return this.currentItems.map(world => world.toPrimitives());
  }

  public static create(initialWorlds?: Array<World>): Worlds {
    return new Worlds(initialWorlds ?? []);
  }

  public static fromPrimitives(worldsPrimitive: Primitives<Worlds>): Worlds {
    const worlds = worldsPrimitive.map(World.fromPrimitives);
    return this.create(worlds);
  }
}
