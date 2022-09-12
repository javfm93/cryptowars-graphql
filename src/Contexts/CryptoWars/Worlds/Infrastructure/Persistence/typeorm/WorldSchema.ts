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
  }
});
