import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PlayerSchema } from '../../Players/Infrastructure/PlayerSchema';
import { WorldSchema } from '../../Worlds/Infrastructure/Persistence/WorldSchema';
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
