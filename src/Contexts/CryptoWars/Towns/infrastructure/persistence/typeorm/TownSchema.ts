import { EntitySchema } from 'typeorm';
import { TownPrimitives } from '../../../domain/Town';
import { PlayerSchema } from '../../../../Players/Infrastructure/Persistence/typeorm/PlayerSchema';

export const TownSchema = new EntitySchema<TownPrimitives>({
  name: 'Town',
  tableName: 'towns',
  columns: {
    id: {
      type: String,
      primary: true
    }
  },
  relations: {
    playerId: {
      type: 'many-to-one',
      target: PlayerSchema,
      onDelete: 'SET NULL'
    }
  }
});
