import { EntitySchema } from 'typeorm';
import { Army } from '../../../Domain/Army';
import { Primitives } from '../../../../../Shared/Domain/Primitives';

export const ArmySchema: EntitySchema<Primitives<Army>> = new EntitySchema<Primitives<Army>>({
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
    },
    squads: {
      type: 'simple-json'
    }
  }
});
