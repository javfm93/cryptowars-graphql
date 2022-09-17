import { EntitySchema } from 'typeorm';
import { TownPrimitives } from '../../../domain/Town';

type TownDbSchema = TownPrimitives & { player: string };
export const TownSchema = new EntitySchema<TownDbSchema>({
  name: 'Town',
  tableName: 'towns',
  columns: {
    id: {
      type: String,
      primary: true
    },
    playerId: {
      type: String,
      nullable: true
    }
  },
  relations: {
    player: {
      type: 'many-to-one',
      target: 'Player',
      onDelete: 'SET NULL',
      inverseSide: 'towns'
    }
  }
});
