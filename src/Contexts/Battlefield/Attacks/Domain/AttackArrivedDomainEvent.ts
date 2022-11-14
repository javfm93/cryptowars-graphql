import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type BattleStartedDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
};

export class AttackArrivedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.attack.arrived';

  constructor(props: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = props;
    super(AttackArrivedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
  }

  toPrimitive(): Primitives<AttackArrivedDomainEvent> {
    return {
      eventId: this.eventId,
      eventName: AttackArrivedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { startedAt: this.occurredOn }
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): AttackArrivedDomainEvent {
    return new AttackArrivedDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.id.toString()
    });
  }

  static fromPrimitives(plainData: BattleStartedDomainEventBody): DomainEvent {
    return new AttackArrivedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === AttackArrivedDomainEvent.EVENT_NAME;
  }
}
