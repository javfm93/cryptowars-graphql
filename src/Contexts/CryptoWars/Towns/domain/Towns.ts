import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { Town, TownPrimitives } from './Town';

export class Towns extends WatchedList<Town, TownPrimitives> {
  private constructor(initial: Array<Town>) {
    super(initial);
  }

  public compareItems(a: Town, b: Town): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<TownPrimitives> {
    return this.currentItems.map(town => town.toPrimitives());
  }

  public static create(initialTowns?: Array<Town>): Towns {
    return new Towns(initialTowns ?? []);
  }

  public static fromPrimitives(townsPrimitive: Array<TownPrimitives>): Towns {
    const towns = townsPrimitive.map(Town.fromPrimitives);
    return this.create(towns);
  }
}
