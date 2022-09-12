import { VillageCreatedDomainEvent } from './VillageCreatedDomainEvent';
import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { VillageId } from './VillageId';

export interface VillageProps {}

export interface VillagePrimitives {
  id: string;
}

export class Village extends AggregateRoot<VillageProps> {
  private constructor(id: VillageId) {
    super(id, {});
  }

  public static create(id: VillageId): Village {
    const village = new Village(id);
    village.record(
      new VillageCreatedDomainEvent({
        id: village.id.toString()
      })
    );
    return village;
  }

  toPrimitives(): VillagePrimitives {
    return {
      id: this.id.toString()
    };
  }

  static fromPrimitives(plainData: VillagePrimitives): Village {
    return new Village(VillageId.create(plainData.id));
  }
}
