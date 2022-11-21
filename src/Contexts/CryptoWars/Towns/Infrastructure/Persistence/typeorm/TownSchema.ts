import { EntitySchema } from 'typeorm';
import { TownPrimitives } from '../../../Domain/Town';

type TownDbSchema = TownPrimitives & { player: string; world: string };
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
    },
    worldId: {
      type: String,
      nullable: true
    },
    buildings: {
      type: 'simple-json',
      nullable: false
    }
  },
  relations: {
    player: {
      type: 'many-to-one',
      target: 'Player',
      onDelete: 'SET NULL',
      inverseSide: 'towns'
    },
    world: {
      type: 'many-to-one',
      target: 'World',
      onDelete: 'SET NULL',
      inverseSide: 'worlds'
    }
  }
});
