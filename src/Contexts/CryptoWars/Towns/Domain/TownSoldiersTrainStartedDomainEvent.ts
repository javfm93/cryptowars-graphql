import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { TownSoldiersPrimitives } from './TownSoldiers';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { TownSoldiersTrainFinished } from './TownSoldiersTrainFinishedDomainEvent';
import { TaskRequestedDomainEvent } from '../../../Scheduler/Tasks/Domain/TaskRequestedDomainEvent';

export class TownSoldiersTrainStarted extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.town.soldiersTrainStarted';
  readonly soldiers: TownSoldiersPrimitives;

  constructor(props: OptionalDomainEventProps<TownSoldiersTrainStarted>) {
    const { aggregateId, soldiers, eventId, occurredOn } = props;
    super(TownSoldiersTrainStarted.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.soldiers = soldiers;
  }

  toPrimitive(): Primitives<TownSoldiersTrainStarted> {
    return {
      eventId: this.eventId,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventName: TownSoldiersTrainStarted.EVENT_NAME,
      soldiers: this.soldiers
    };
  }

  toTaskRequest(): TaskRequestedDomainEvent {
    const oneSecondsInMs = 1000;
    const afterTrain = new TownSoldiersTrainFinished({
      aggregateId: this.aggregateId,
      soldiers: this.soldiers
    });
    return new TaskRequestedDomainEvent({
      triggerAt: Date.now() + oneSecondsInMs,
      eventToTrigger: afterTrain.toTaskEvent()
    });
  }

  static fromPrimitives(primitives: Primitives<TownSoldiersTrainStarted>): DomainEvent {
    return new TownSoldiersTrainStarted(primitives);
  }
}
