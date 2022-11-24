import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { SquadsPrimitives } from './Squads';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = {
  squad: SquadsPrimitives;
};

export class SoldiersRecruitedDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.army.soldiersRecruited';

  constructor(props: OptionalDomainEventProps<SoldiersRecruitedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(SoldiersRecruitedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): SoldiersRecruitedDomainEvent {
    return new SoldiersRecruitedDomainEvent({
      aggregateId: event.aggregateId,
      id: event.aggregateId.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(
    primitives: Primitives<SoldiersRecruitedDomainEvent>
  ): SoldiersRecruitedDomainEvent {
    return new SoldiersRecruitedDomainEvent(primitives);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersRecruitedDomainEvent.TYPE;
  }
}
