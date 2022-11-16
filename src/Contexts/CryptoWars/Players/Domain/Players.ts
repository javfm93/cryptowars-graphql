import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { Player, PlayerCorePrimitives, PlayerPrimitives } from './Player';

export class Players extends WatchedList<Player, PlayerPrimitives> {
  protected constructor(initial: Array<Player>) {
    super(initial);
  }

  public compareItems(a: Player, b: Player): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<PlayerPrimitives> {
    return this.currentItems.map(player => player.toPrimitives());
  }

  public toCorePrimitives(): Array<PlayerCorePrimitives> {
    return this.currentItems.map(player => player.toCorePrimitives());
  }

  public static create(initialPlayers?: Array<Player>): Players {
    return new Players(initialPlayers ?? []);
  }

  public static fromPrimitives(playersPrimitive: Array<PlayerPrimitives>): Players {
    const players = playersPrimitive.map(Player.fromPrimitives);
    return this.create(players);
  }

  public static fromCorePrimitives(playersPrimitive: Array<PlayerCorePrimitives>): Players {
    const players = playersPrimitive.map(Player.fromCorePrimitives);
    return this.create(players);
  }
}
