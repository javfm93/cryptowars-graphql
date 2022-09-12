import { Player } from '../Player';
import { initialUsers } from '../../../Users/Domain/Seed/InitialUsers';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { initialWorlds } from '../../../Worlds/Domain/Seed/InitialWorlds';

export const initialPlayers: Array<Player> = initialUsers.map(user =>
  Player.fromPrimitives({
    id: Uuid.random().toString(),
    userId: user.id.toString(),
    worlds: initialWorlds.toPrimitives()
  })
);
