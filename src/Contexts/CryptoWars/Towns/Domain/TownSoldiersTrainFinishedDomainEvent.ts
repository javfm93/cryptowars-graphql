import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { TownSoldiersPrimitives } from './TownSoldiers';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { TaskEventToTrigger } from '../../../Scheduler/Tasks/Domain/TaskEventToTrigger';

type Attributes = {
  soldiers: TownSoldiersPrimitives;
};

export class TownSoldiersTrainFinished extends DomainEvent<Attributes> {
  static readonly TYPE = 'cryptoWars.1.event.town.soldiersTrainFinished';

  constructor(props: OptionalDomainEventProps<TownSoldiersTrainFinished>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(TownSoldiersTrainFinished.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toTaskEvent(): Primitives<TaskEventToTrigger> {
    return {
      id: this.id,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      type: TownSoldiersTrainFinished.TYPE,
      attributes: { data: this.attributes },
      meta: {}
    };
  }

  static fromPrimitives(
    primitives: Primitives<TownSoldiersTrainFinished>
  ): TownSoldiersTrainFinished {
    return new TownSoldiersTrainFinished(primitives);
  }
}
