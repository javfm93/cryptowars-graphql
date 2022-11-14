import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Army } from './Army';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';

type ArmyCreatedDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly townId: string;
  readonly playerId: string;
  readonly occurredOn: Date;
};

export class ArmyCreatedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.created';
  readonly townId: string;
  readonly playerId: string;

  constructor(props: {
    id: string;
    eventId?: string;
    occurredOn?: Date;
    townId: string;
    playerId: string;
  }) {
    const { id, eventId, occurredOn, townId, playerId } = props;
    super(ArmyCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.townId = townId;
    this.playerId = playerId;
  }

  toPrimitive(): ArmyCreatedDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: ArmyCreatedDomainEvent.EVENT_NAME,
      id: aggregateId,
      townId: this.townId,
      playerId: this.playerId,
      occurredOn: this.occurredOn
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: { townId: this.townId, playerId: this.playerId }
    });
  }

  toArmy(): Army {
    return Army.create({
      id: ArmyId.create(this.aggregateId),
      townId: TownId.create(this.townId),
      playerId: PlayerId.create(this.playerId)
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({
      id: event.aggregateId,
      eventId: event.id.toString(),
      townId: event.toPrimitives().data.townId,
      playerId: event.toPrimitives().data.playerId
    });
  }

  static fromPrimitives(plainData: ArmyCreatedDomainEventBody): DomainEvent {
    return new ArmyCreatedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === ArmyCreatedDomainEvent.EVENT_NAME;
  }
}
