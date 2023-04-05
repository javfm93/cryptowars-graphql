import { Column, Entity, EntitySchema, ManyToOne, PrimaryColumn } from 'typeorm';
import { PlayerSchema } from '../../Players/Infrastructure/PlayerSchema';
import { WorldSchema } from '../../Worlds/Infrastructure/Persistence/WorldSchema';
import { TownPrimitives } from '../Domain/Town';
import { TownBuildingsPrimitives } from '../Domain/TownBuildings';

@Entity('towns')
export class TownSchema {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: true })
  playerId!: string;

  @Column({ nullable: true })
  worldId!: string;

  @Column('simple-json', { nullable: false })
  buildings!: TownBuildingsPrimitives;

  @ManyToOne(() => PlayerSchema, p => p.towns, { onDelete: 'SET NULL' })
  player!: PlayerSchema;

  @ManyToOne(() => WorldSchema, w => w.towns, { onDelete: 'SET NULL' })
  world!: WorldSchema;
}


type TownDbSchema = TownPrimitives & { player: string; world: string };
export const TownSchema2 = new EntitySchema<TownDbSchema>({
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
