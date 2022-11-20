import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { AttackTroop } from '../../Attacks/Domain/AttackTroop';

type BattleTroopReturnedDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
  readonly troop: Primitives<AttackTroop>;
};

export class BattleTroopReturnedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.battle.troopReturned';
  readonly troop: Primitives<AttackTroop>;

  constructor(props: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    readonly troop: Primitives<AttackTroop>;
  }) {
    const { aggregateId, eventId, occurredOn } = props;
    super(BattleTroopReturnedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.troop = props.troop;
  }

  toPrimitive(): Primitives<BattleTroopReturnedDomainEvent> {
    return {
      eventId: this.eventId,
      eventName: BattleTroopReturnedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      troop: this.troop
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: {
        troop: this.troop
      }
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): BattleTroopReturnedDomainEvent {
    return new BattleTroopReturnedDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.id.toString(),
      troop: event.toPrimitives().data.troop
    });
  }

  static fromPrimitives(plainData: BattleTroopReturnedDomainEventBody): DomainEvent {
    return new BattleTroopReturnedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === BattleTroopReturnedDomainEvent.EVENT_NAME;
  }
}
