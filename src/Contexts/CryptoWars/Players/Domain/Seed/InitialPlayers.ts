import { Player } from '../Player';
import { initialUsers } from '../../../Users/Domain/Seed/InitialUsers';

export const initialPlayers: Array<Player> = initialUsers.map(
  user =>
    Player.fromPrimitives({
      userId: user.id.toString()
    }).value as Player
);
