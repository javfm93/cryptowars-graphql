import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

export interface BattlefieldEventProps {
  aggregateId: string;
  version: number;
  eventName: string;
  data: object;
}

export interface BattlefieldEventPrimitives {
  id: string;
  aggregateId: string;
  version: number;
  eventName: string;
  data: object;
}

export abstract class BattlefieldDomainEvent extends DomainEvent {
  abstract toBattlefieldEvent(): BattlefieldEvent;
}

export class BattlefieldEvent extends AggregateRoot<BattlefieldEventProps> {
  constructor(id: Uuid, props: BattlefieldEventProps) {
    super(id, props);
  }

  get aggregateId(): string {
    return this.props.aggregateId;
  }

  increaseVersionFrom(lastEvent: BattlefieldEventPrimitives): void {
    this.props.version = lastEvent.version + 1;
  }

  toPrimitives(): BattlefieldEventPrimitives {
    return {
      id: this.id.toString(),
      ...this.props
    };
  }

  static fromPrimitives(plainData: BattlefieldEventPrimitives): BattlefieldEvent {
    return new BattlefieldEvent(new Uuid(plainData.id), plainData);
  }
}
