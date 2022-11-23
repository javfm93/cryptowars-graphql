import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { SquadsPrimitives } from './Squads';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class SoldiersRecruitedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.soldiersRecruited';
  readonly squad: SquadsPrimitives;

  constructor(props: OptionalDomainEventProps<SoldiersRecruitedDomainEvent>) {
    const { aggregateId, eventId, occurredOn, squad } = props;
    super(SoldiersRecruitedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.squad = squad;
  }

  toPrimitive(): Primitives<SoldiersRecruitedDomainEvent> {
    return {
      eventId: this.eventId,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventName: SoldiersRecruitedDomainEvent.EVENT_NAME,
      squad: this.squad
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { squad: this.squad }
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): SoldiersRecruitedDomainEvent {
    return new SoldiersRecruitedDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.aggregateId.toString(),
      squad: event.toPrimitives().data.squad
    });
  }

  static fromPrimitives(
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    squad: SquadsPrimitives
  ): DomainEvent {
    return new SoldiersRecruitedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      squad
    });
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersRecruitedDomainEvent.EVENT_NAME;
  }
}
