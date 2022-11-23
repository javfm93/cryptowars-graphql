import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { SquadsPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class SoldiersReceivedFromBattleDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.soldiersReceivedFromBattle';
  readonly squads: SquadsPrimitives;

  constructor(props: OptionalDomainEventProps<SoldiersReceivedFromBattleDomainEvent>) {
    const { aggregateId, eventId, occurredOn, squads } = props;
    super(SoldiersReceivedFromBattleDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.squads = squads;
  }

  toPrimitive(): Primitives<SoldiersReceivedFromBattleDomainEvent> {
    return {
      eventId: this.eventId,
      eventName: SoldiersReceivedFromBattleDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      squads: this.squads
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { squads: this.squads }
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): SoldiersReceivedFromBattleDomainEvent {
    return new SoldiersReceivedFromBattleDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.id.toString(),
      squads: event.toPrimitives().data.squads
    });
  }

  static fromPrimitives(
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    squads: SquadsPrimitives
  ): DomainEvent {
    return new SoldiersReceivedFromBattleDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      squads
    });
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersReceivedFromBattleDomainEvent.EVENT_NAME;
  }
}
