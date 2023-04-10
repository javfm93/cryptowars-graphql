import { Primitives } from '../../../Shared/Domain/Primitives';
import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { Town } from './Town';

export class Towns extends WatchedList<Town> {
  private constructor(initial: Array<Town>) {
    super(initial);
  }

  public compareItems(a: Town, b: Town): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Primitives<Towns> {
    return this.currentItems.map(town => town.toPrimitives());
  }

  public static create(initialTowns?: Array<Town>): Towns {
    return new Towns(initialTowns ?? []);
  }

  public static fromPrimitives(townsPrimitive: Primitives<Towns>): Towns {
    const towns = townsPrimitive.map(Town.fromPrimitives);
    return this.create(towns);
  }
}
