import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Attack } from '../../Attacks/Domain/Attack';
import { Army } from '../../Armies/Domain/Army';
import { Battle } from './Battle';
import { BattleResult } from './BattleResult';

type Attributes = {
  readonly attack: Primitives<Attack>;
  readonly defenderArmy: Primitives<Army>;
  readonly finishedAt: Date;
  readonly result: Primitives<BattleResult>;
};

export class BattleCreatedDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.battle.created';

  constructor(props: OptionalDomainEventProps<BattleCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    const att = attributes
      ? { ...attributes, finishedAt: new Date(attributes.finishedAt) }
      : attributes;
    super(BattleCreatedDomainEvent.TYPE, aggregateId, att, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  toBattle(): Battle {
    return Battle.fromPrimitives({
      id: this.aggregateId,
      attack: this.attributes.attack,
      defenderArmy: this.attributes.defenderArmy,
      finishedAt: this.attributes.finishedAt.toISOString(),
      result: this.attributes.result
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): BattleCreatedDomainEvent {
    return new BattleCreatedDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(plainData: Primitives<BattleCreatedDomainEvent>): BattleCreatedDomainEvent {
    return new BattleCreatedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === BattleCreatedDomainEvent.TYPE;
  }
}
