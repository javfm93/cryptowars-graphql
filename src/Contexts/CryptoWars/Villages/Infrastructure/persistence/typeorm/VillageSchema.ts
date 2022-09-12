import { EntitySchema } from 'typeorm';
import { VillagePrimitives } from '../../../Domain/Village';

export const VillageSchema = new EntitySchema<VillagePrimitives>({
  name: 'Village',
  tableName: 'villages',
  columns: {
    id: {
      type: String,
      primary: true
    }
  }
});
