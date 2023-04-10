import { Primitives } from '../../../Shared/Domain/Primitives';
import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Battle } from './Battle';

export class Battles extends WatchedList<Battle> {
  private constructor(initial: Array<Battle>) {
    super(initial);
  }

  public compareItems(a: Battle, b: Battle): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<Primitives<Battle>> {
    return this.currentItems.map(battle => battle.toPrimitives());
  }

  public static create(initialBattles?: Array<Battle>): Battles {
    return new Battles(initialBattles ?? []);
  }

  public static fromPrimitives(battlesPrimitive: Array<Primitives<Battle>>): Battles {
    const battles = battlesPrimitive.map(Battle.fromPrimitives);
    return this.create(battles);
  }

  static materializeFrom(events: Array<BattlefieldInternalEvent>): Battles {
    type GroupedEvents = {
      [key: string]: Array<BattlefieldInternalEvent>;
    };
    const groupedEvents = events.reduce((grouped: GroupedEvents, event) => {
      grouped[event.aggregateId]
        ? grouped[event.aggregateId].push(event)
        : (grouped[event.aggregateId] = [event]);
      return grouped;
    }, {});
    const battles = Object.values(groupedEvents).map(Battle.materializeFrom);
    return this.create(battles);
  }
}
