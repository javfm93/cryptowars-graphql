import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { TownSoldiersPrimitives } from './TownSoldiers';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { TownSoldiersTrainFinished } from './TownSoldiersTrainFinishedDomainEvent';
import { TaskRequestedDomainEvent } from '../../../Scheduler/Tasks/Domain/TaskRequestedDomainEvent';

type Attributes = {
  soldiers: TownSoldiersPrimitives;
};

export class TownSoldiersTrainStarted extends DomainEvent<Attributes> {
  static readonly TYPE = 'cryptoWars.1.event.town.soldiersTrainStarted';

  constructor(props: OptionalDomainEventProps<TownSoldiersTrainStarted>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(TownSoldiersTrainFinished.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toTaskRequest(): TaskRequestedDomainEvent {
    const oneSecondsInMs = 1000;
    const afterTrain = new TownSoldiersTrainFinished({
      aggregateId: this.aggregateId,
      attributes: this.attributes
    });
    return new TaskRequestedDomainEvent({
      attributes: {
        triggerAt: Date.now() + oneSecondsInMs,
        eventToTrigger: afterTrain.toTaskEvent()
      }
    });
  }

  static fromPrimitives(
    primitives: Primitives<TownSoldiersTrainStarted>
  ): TownSoldiersTrainStarted {
    return new TownSoldiersTrainStarted(primitives);
  }
}
