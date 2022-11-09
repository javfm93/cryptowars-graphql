import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { SquadPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';

type SoldiersRecruitedDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly townId: string;
  readonly soldiers: SquadPrimitives;
};

export class SoldiersRecruitedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.soldiersRecruited';
  readonly townId: string;
  readonly squad: SquadPrimitives;

  constructor(props: {
    id: string;
    eventId?: string;
    occurredOn?: Date;
    townId: string;
    squad: SquadPrimitives;
  }) {
    const { id, eventId, occurredOn, townId, squad } = props;
    super(SoldiersRecruitedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.townId = townId;
    this.squad = squad;
  }

  toPrimitive(): SoldiersRecruitedDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: SoldiersRecruitedDomainEvent.EVENT_NAME,
      id: aggregateId,
      townId: this.townId,
      soldiers: this.squad
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { townId: this.townId, squad: this.squad }
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): SoldiersRecruitedDomainEvent {
    return new SoldiersRecruitedDomainEvent({
      id: event.aggregateId,
      eventId: event.id.toString(),
      townId: event.toPrimitives().data.townId,
      squad: event.toPrimitives().data.squad
    });
  }

  static fromPrimitives(
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    townId: string,
    squad: SquadPrimitives
  ): DomainEvent {
    return new SoldiersRecruitedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn,
      townId,
      squad
    });
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersRecruitedDomainEvent.EVENT_NAME;
  }
}
