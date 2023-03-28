import { Column, Entity, EntitySchema, ManyToOne, PrimaryColumn } from 'typeorm';
import { TownPrimitives } from '../Domain/Town';
import { Field, ID, InterfaceType, ObjectType, registerEnumType } from 'type-graphql';
import { PlayerSchema } from '../../Players/Infrastructure/PlayerSchema';
import { WorldSchema } from '../../Worlds/Infrastructure/Persistence/WorldSchema';
import { TownBuildingsPrimitives } from '../Domain/TownBuildings';
import {
  EssenceGenerator,
  Headquarter,
  TownAssets,
  TownBuildingTypes,
  Warehouse,
  WarehouseAssets
} from '../Domain/TownBuilding';
import { TownSoldier, TownSoldierTypes } from '../Domain/TownSoldier';

@ObjectType('Town')
@Entity('towns')
export class TownSchema {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ nullable: true })
  playerId!: string;

  @Field()
  @Column({ nullable: true })
  worldId!: string;

  @Field(type => TownBuildingsSchema)
  @Column('simple-json', { nullable: false })
  buildings!: TownBuildingsPrimitives;

  @ManyToOne(() => PlayerSchema, p => p.towns, { onDelete: 'SET NULL' })
  player!: PlayerSchema;

  @ManyToOne(() => WorldSchema, w => w.towns, { onDelete: 'SET NULL' })
  world!: WorldSchema;
}

@ObjectType('TownBuildings')
export class TownBuildingsSchema {
  @Field(() => HeadquarterSchema)
  headquarter!: Headquarter;

  @Field(() => EssenceGeneratorSchema)
  essenceGenerator!: EssenceGenerator;

  @Field(() => WarehouseSchema)
  warehouse!: Warehouse;
}

@InterfaceType()
abstract class TownBuildingSchema {
  @Field()
  level!: number;
  @Field()
  essenceRequiredToLevelUp!: number;
  @Field(type => TownBuildingTypes)
  type!: TownBuildingTypes;
}

@ObjectType('Headquarter', { implements: TownBuildingSchema })
export class HeadquarterSchema {
  @Field(type => [TownSoldierSchema])
  units!: Array<TownSoldier>;
}

@ObjectType('EssenceGenerator', { implements: TownBuildingSchema })
export class EssenceGeneratorSchema {
  @Field(type => TownAssets)
  asset!: TownAssets;

  @Field()
  generationPerHour!: number;
}

@ObjectType('Warehouse', { implements: TownBuildingSchema })
export class WarehouseSchema {
  @Field(type => WarehouseAssetsSchema)
  assets!: WarehouseAssets;
}

@ObjectType('TownSoldier')
export class TownSoldierSchema {
  @Field(type => TownSoldierTypes)
  name!: TownSoldierTypes;

  @Field()
  speed!: number;

  @Field()
  capacity!: number;

  @Field()
  time!: number;

  @Field()
  cost!: number;
}

@ObjectType('WarehouseAssets')
export class WarehouseAssetsSchema {
  @Field(type => WarehouseAssetSchema)
  [TownAssets.essence]!: WarehouseAssets;
}

@ObjectType('WarehouseAsset')
export class WarehouseAssetSchema {
  @Field(type => TownAssets)
  name!: TownAssets;

  @Field()
  limit!: number;

  @Field()
  stored!: number;

  @Field()
  lastStorageUpdate!: string;
}

registerEnumType(TownBuildingTypes, {
  name: 'TownBuildingTypes'
});

registerEnumType(TownSoldierTypes, {
  name: 'TownSoldierTypes'
});

registerEnumType(TownAssets, {
  name: 'TownAssets'
});

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
