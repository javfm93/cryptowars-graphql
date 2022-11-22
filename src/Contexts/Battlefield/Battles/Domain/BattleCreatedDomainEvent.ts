import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Attack } from '../../Attacks/Domain/Attack';
import { Army } from '../../Armies/Domain/Army';
import { Battle } from './Battle';
import { BattleResult } from './BattleResult';

type BattleCreatedDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
  readonly attack: Primitives<Attack>;
  readonly defenderArmy: Primitives<Army>;
  readonly finishedAt: Date;
  readonly result: Primitives<BattleResult>;
};

export class BattleCreatedDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.battle.created';
  readonly attack: Primitives<Attack>;
  readonly defenderArmy: Primitives<Army>;
  readonly finishedAt: Date;
  readonly result: Primitives<BattleResult>;

  constructor(props: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    readonly attack: Primitives<Attack>;
    readonly defenderArmy: Primitives<Army>;
    readonly finishedAt: Date;
    readonly result: Primitives<BattleResult>;
  }) {
    const { aggregateId, eventId, occurredOn } = props;
    super(BattleCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attack = props.attack;
    this.defenderArmy = props.defenderArmy;
    this.finishedAt = props.finishedAt;
    this.result = props.result;
  }

  toPrimitive(): Primitives<BattleCreatedDomainEvent> {
    return {
      eventId: this.eventId,
      eventName: BattleCreatedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      attack: this.attack,
      defenderArmy: this.defenderArmy,
      finishedAt: this.finishedAt,
      result: this.result
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: {
        attack: this.attack,
        defenderArmy: this.defenderArmy,
        finishedAt: this.finishedAt,
        result: this.result
      }
    });
  }

  toBattle(): Battle {
    return Battle.fromPrimitives({
      id: this.aggregateId,
      attack: this.attack,
      defenderArmy: this.defenderArmy,
      finishedAt: this.finishedAt.toISOString(),
      result: this.result
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): BattleCreatedDomainEvent {
    return new BattleCreatedDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.id.toString(),
      attack: event.toPrimitives().data.attack,
      defenderArmy: event.toPrimitives().data.defenderArmy,
      finishedAt: new Date(event.toPrimitives().data.finishedAt),
      result: event.toPrimitives().data.result
    });
  }

  static fromPrimitives(plainData: BattleCreatedDomainEventBody): DomainEvent {
    return new BattleCreatedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === BattleCreatedDomainEvent.EVENT_NAME;
  }
}
