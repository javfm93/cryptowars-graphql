import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { SquadsPrimitives } from './Squads';

type SoldiersRecruitedDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly soldiers: SquadsPrimitives;
};

export class SoldiersRecruitedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.soldiersRecruited';
  readonly squad: SquadsPrimitives;

  constructor(props: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    squad: SquadsPrimitives;
  }) {
    const { aggregateId, eventId, occurredOn, squad } = props;
    super(SoldiersRecruitedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.squad = squad;
  }

  toPrimitive(): SoldiersRecruitedDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: SoldiersRecruitedDomainEvent.EVENT_NAME,
      aggregateId: aggregateId,
      soldiers: this.squad
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
      eventId: event.id.toString(),
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
