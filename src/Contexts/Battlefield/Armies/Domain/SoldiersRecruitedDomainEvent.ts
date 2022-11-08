import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { SquadPrimitives } from './Squads';
import { BattlefieldDomainEvent, BattlefieldEvent } from '../../Shared/Domain/BattlefieldEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

type SoldiersRecruitedDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly townId: string;
  readonly soldiers: SquadPrimitives;
};

export class SoldiersRecruitedDomainEvent extends BattlefieldDomainEvent {
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

  toBattlefieldEvent(): BattlefieldEvent {
    return new BattlefieldEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { townId: this.townId, squad: this.squad }
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
}
