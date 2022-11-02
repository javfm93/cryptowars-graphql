import { EntitySchema } from 'typeorm';
import { WorldPrimitives } from '../../../Domain/World';

export const WorldSchema = new EntitySchema<WorldPrimitives>({
  name: 'World',
  tableName: 'worlds',
  columns: {
    id: {
      type: String,
      primary: true
    },
    name: {
      type: String,
      unique: true
    }
  },
  relations: {
    players: {
      type: 'many-to-many',
      target: 'Player',
      cascade: ['insert', 'update'],
      joinTable: true
    },
    towns: {
      type: 'many-to-many',
      target: 'Town',
      cascade: ['insert', 'update'],
      joinTable: true
    }
  }
});
