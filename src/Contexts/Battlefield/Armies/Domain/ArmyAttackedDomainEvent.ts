import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { SquadsPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

type ArmyAttackedDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly casualties: SquadsPrimitives;
};

export class ArmyAttackedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.attacked';
  readonly squads: SquadsPrimitives;

  constructor(props: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    squads: SquadsPrimitives;
  }) {
    const { aggregateId, eventId, occurredOn, squads } = props;
    super(ArmyAttackedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.squads = squads;
  }

  toPrimitive(): ArmyAttackedDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: ArmyAttackedDomainEvent.EVENT_NAME,
      aggregateId: aggregateId,
      casualties: this.squads
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

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): ArmyAttackedDomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.aggregateId.toString(),
      squads: event.toPrimitives().data.squads
    });
  }

  static fromPrimitives(
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    armyId: string,
    squads: SquadsPrimitives
  ): DomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId: aggregateId,
      eventId,
      occurredOn,
      squads
    });
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === ArmyAttackedDomainEvent.EVENT_NAME;
  }
}
