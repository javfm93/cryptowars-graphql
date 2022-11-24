import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { SquadsPrimitives } from './Squads';

type Attributes = { casualties: SquadsPrimitives };

export class ArmyAttackedDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.army.attacked';

  constructor(props: OptionalDomainEventProps<ArmyAttackedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(ArmyAttackedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): ArmyAttackedDomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId: event.aggregateId,
      id: event.aggregateId.toString(),
      attributes: { casualties: event.toPrimitives().data.casualties }
    });
  }

  static fromPrimitives(primitives: Primitives<ArmyAttackedDomainEvent>): ArmyAttackedDomainEvent {
    return new ArmyAttackedDomainEvent(primitives);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === ArmyAttackedDomainEvent.TYPE;
  }
}
