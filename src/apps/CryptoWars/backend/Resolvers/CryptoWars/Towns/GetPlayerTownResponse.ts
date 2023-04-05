import { Field, ID, InterfaceType, ObjectType, registerEnumType } from 'type-graphql';
import { TownAssets, TownBuildingTypes } from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownBuilding';
import { TownSoldierTypes } from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldier';

@ObjectType()
class TownSoldier {
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

@InterfaceType()
abstract class TownBuilding {
  @Field()
  level!: number;
  @Field()
  essenceRequiredToLevelUp!: number;
  @Field(type => TownBuildingTypes)
  type!: TownBuildingTypes;
}

@ObjectType({ implements: TownBuilding })
class Headquarter {
  @Field(type => [TownSoldier])
  units!: Array<TownSoldier>;
}

@ObjectType({ implements: TownBuilding })
class EssenceGenerator {
  @Field(type => TownAssets)
  asset!: TownAssets;

  @Field()
  generationPerHour!: number;
}

@ObjectType()
class WarehouseAsset {
  @Field(type => TownAssets)
  name!: TownAssets;

  @Field()
  limit!: number;

  @Field()
  stored!: number;

  @Field()
  lastStorageUpdate!: string;
}

@ObjectType()
class WarehouseAssets {
  @Field(type => WarehouseAsset)
  [TownAssets.essence]!: WarehouseAsset;
}

@ObjectType({ implements: TownBuilding })
class Warehouse {
  @Field(type => WarehouseAssets)
  assets!: WarehouseAssets;
}

@ObjectType()
class TownBuildings {
  @Field(() => Headquarter)
  headquarter!: Headquarter;

  @Field(() => EssenceGenerator)
  essenceGenerator!: EssenceGenerator;

  @Field(() => Warehouse)
  warehouse!: Warehouse;
}

@ObjectType()
export class Town {
  @Field(() => ID)
  id!: string;

  @Field()
  playerId!: string;

  @Field()
  worldId!: string;

  @Field(type => TownBuildings)
  buildings!: TownBuildings;
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
