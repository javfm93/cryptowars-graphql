import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { SquadsPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class ArmyAttackedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.attacked';
  readonly casualties: SquadsPrimitives;

  constructor(props: OptionalDomainEventProps<ArmyAttackedDomainEvent>) {
    const { aggregateId, eventId, occurredOn, casualties } = props;
    super(ArmyAttackedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.casualties = casualties;
  }

  toPrimitive(): Primitives<ArmyAttackedDomainEvent> {
    return {
      eventName: ArmyAttackedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventId: this.eventId,
      casualties: this.casualties
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { casualties: this.casualties }
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): ArmyAttackedDomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.aggregateId.toString(),
      casualties: event.toPrimitives().data.casualties
    });
  }

  static fromPrimitives(
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    casualties: SquadsPrimitives
  ): DomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      casualties
    });
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === ArmyAttackedDomainEvent.EVENT_NAME;
  }
}
