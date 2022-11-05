import { EntitySchema } from 'typeorm';
import { ArmyPrimitives } from '../../../Domain/Army';

export const ArmySchema: EntitySchema<ArmyPrimitives> = new EntitySchema<ArmyPrimitives>({
  name: 'Army',
  tableName: 'armies',
  columns: {
    id: {
      type: String,
      primary: true
    },
    townId: {
      type: String,
      unique: true
    },
    playerId: {
      type: String,
      unique: true
    }
  }
});
