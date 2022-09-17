import { EntitySchema } from 'typeorm';
import { PlayerPrimitives } from '../../../Domain/Player';

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
    },
    worlds: {
      type: 'simple-json'
    }
  },
  relations: {
    towns: {
      type: 'one-to-many',
      target: 'Town',
      onDelete: 'SET NULL',
      cascade: ['insert', 'update'],
      inverseSide: 'player'
    }
  }
});
