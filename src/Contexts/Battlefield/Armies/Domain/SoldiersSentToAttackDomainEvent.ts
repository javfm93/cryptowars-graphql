import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { SquadsPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';

type SoldiersSentDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly soldiers: SquadsPrimitives;
};

export class SoldiersSentToAttackDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.soldiersSentToAttack';
  readonly squads: SquadsPrimitives;

  constructor(props: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    squads: SquadsPrimitives;
  }) {
    const { aggregateId, eventId, occurredOn, squads } = props;
    super(SoldiersSentToAttackDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.squads = squads;
  }

  toPrimitive(): SoldiersSentDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: SoldiersSentToAttackDomainEvent.EVENT_NAME,
      aggregateId: aggregateId,
      soldiers: this.squads
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
  ): SoldiersSentToAttackDomainEvent {
    return new SoldiersSentToAttackDomainEvent({
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
    return new SoldiersSentToAttackDomainEvent({
      aggregateId: aggregateId,
      eventId,
      occurredOn,
      squads
    });
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersSentToAttackDomainEvent.EVENT_NAME;
  }
}
