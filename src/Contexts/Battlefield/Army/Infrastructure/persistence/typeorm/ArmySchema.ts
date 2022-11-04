import { EntitySchema } from 'typeorm';
import { PlayerPrimitives } from '../../../Domain/Army';

export const PlayerSchema: EntitySchema<PlayerPrimitives> = new EntitySchema<PlayerPrimitives>({
  name: 'Player',
  tableName: 'players',
  columns: {
    id: {
      type: String,
      primary: true
    },
    userId: {
      type: String,
      unique: true
    }
  },
  relations: {
    towns: {
      type: 'one-to-many',
      target: 'Town',
      onDelete: 'SET NULL',
      cascade: ['insert', 'update'],
      inverseSide: 'player'
    },
    worlds: {
      type: 'many-to-many',
      target: 'World',
      cascade: ['insert', 'update'],
      joinTable: { name: 'worlds_players_players' }
    }
  }
});
