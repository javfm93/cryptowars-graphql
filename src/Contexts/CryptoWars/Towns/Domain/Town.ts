import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { PlayerId } from '../../Players/Domain/PlayerId';
import { WorldId } from '../../Worlds/Domain/WorldId';
import { TownBuildings } from './TownBuildings';
import { TownCreatedDomainEvent } from './TownCreatedDomainEvent';
import { TownId } from './TownId';
import { TownSoldiers } from './TownSoldiers';
import { TownSoldiersTrainStarted } from './TownSoldiersTrainStartedDomainEvent';

export class Town extends AggregateRoot {
  private constructor(
    id: TownId,
    readonly playerId: PlayerId,
    readonly worldId: WorldId,
    readonly buildings: TownBuildings
  ) {
    super(id);
  }

  public static create(id: TownId, playerId: PlayerId, worldId: WorldId): Town {
    const townBuildings = TownBuildings.createInitialBuildings();
    const town = new Town(id, playerId, worldId, townBuildings);
    town.record(
      new TownCreatedDomainEvent({
        aggregateId: town.id.toString(),
        attributes: {
          playerId: town.playerId.toString()
        }
      })
    );
    return town;
  }

  isManagedBy(playerId: PlayerId) {
    return this.playerId.isEqualTo(playerId);
  }

  updateWarehouseAssets(): void {
    this.buildings.updateWarehouseAssets();
  }

  hasEnoughAssetsToTrain(soldiers: TownSoldiers): boolean {
    return this.buildings.getTownEssence() > soldiers.calculateCost();
  }

  train(soldiers: TownSoldiers): void {
    const trainStarted = new TownSoldiersTrainStarted({
      aggregateId: this.id.toString(),
      attributes: {
        soldiers: soldiers.value
      }
    });
    this.record(trainStarted);
    this.record(trainStarted.toTaskRequest());
    this.buildings.payEssence(soldiers.calculateCost());
  }

  toPrimitives(): Primitives<Town> {
    return {
      id: this.id.toString(),
      playerId: this.playerId.toString(),
      worldId: this.worldId.toString(),
      buildings: this.buildings.value
    };
  }

  static fromPrimitives(plainData: Primitives<Town>): Town {
    const playerId = PlayerId.create(plainData.playerId);
    const worldId = WorldId.create(plainData.worldId);
    const buildings = TownBuildings.fromPrimitives(plainData.buildings);
    return new Town(TownId.create(plainData.id), playerId, worldId, buildings);
  }
}
