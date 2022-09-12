import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { World, WorldPrimitives } from './World';

export class Worlds extends WatchedList<World, WorldPrimitives> {
  private constructor(initial: Array<World>) {
    super(initial);
  }

  public compareItems(a: World, b: World): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<WorldPrimitives> {
    return this.currentItems.map(world => world.toPrimitives());
  }

  public static create(initialWorlds?: Array<World>): Worlds {
    return new Worlds(initialWorlds ?? []);
  }

  public static fromPrimitives(worldsPrimitive: Array<WorldPrimitives>): Worlds {
    const worlds = worldsPrimitive.map(World.fromPrimitives);
    return this.create(worlds);
  }
}
