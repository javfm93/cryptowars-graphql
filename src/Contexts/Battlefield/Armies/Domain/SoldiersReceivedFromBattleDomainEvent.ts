import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { SquadsPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = { squads: SquadsPrimitives };

export class SoldiersReceivedFromBattleDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.army.soldiersReceivedFromBattle';

  constructor(props: OptionalDomainEventProps<SoldiersReceivedFromBattleDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    const type = SoldiersReceivedFromBattleDomainEvent.TYPE;
    super(type, aggregateId, attributes, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): SoldiersReceivedFromBattleDomainEvent {
    return new SoldiersReceivedFromBattleDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(
    primitives: Primitives<SoldiersReceivedFromBattleDomainEvent>
  ): SoldiersReceivedFromBattleDomainEvent {
    return new SoldiersReceivedFromBattleDomainEvent(primitives);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersReceivedFromBattleDomainEvent.TYPE;
  }
}
