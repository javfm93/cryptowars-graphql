import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { TownSoldiersPrimitives } from './TownSoldiers';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TownSoldiersTrainFinished extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.town.soldierTrainFinished';
  readonly soldiers: TownSoldiersPrimitives;

  constructor(props: OptionalDomainEventProps<TownSoldiersTrainFinished>) {
    const { aggregateId, soldiers, eventId, occurredOn } = props;
    super(TownSoldiersTrainFinished.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.soldiers = soldiers;
  }

  toPrimitive(): Primitives<TownSoldiersTrainFinished> {
    return {
      eventId: this.eventId,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventName: TownSoldiersTrainFinished.EVENT_NAME,
      soldiers: this.soldiers
    };
  }

  static fromPrimitives(primitives: Primitives<TownSoldiersTrainFinished>): DomainEvent {
    return new TownSoldiersTrainFinished(primitives);
  }
}
