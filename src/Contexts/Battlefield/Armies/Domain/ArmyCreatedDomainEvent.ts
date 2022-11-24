import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Army } from './Army';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = {
  readonly townId: string;
  readonly playerId: string;
};

export class ArmyCreatedDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.army.created';

  constructor(props: OptionalDomainEventProps<ArmyCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(ArmyCreatedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  toArmy(): Army {
    return Army.create({
      id: ArmyId.create(this.aggregateId),
      townId: TownId.create(this.attributes.townId),
      playerId: PlayerId.create(this.attributes.playerId)
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(plainData: Primitives<ArmyCreatedDomainEvent>): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === ArmyCreatedDomainEvent.TYPE;
  }
}
