import { EntitySchema } from 'typeorm';
import { PlayerPrimitives } from '../../../Domain/Player';

export const PlayerSchema = new EntitySchema<PlayerPrimitives>({
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
  }
});
