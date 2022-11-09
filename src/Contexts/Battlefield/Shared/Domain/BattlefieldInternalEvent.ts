import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { AggregateRoot } from './AggregateRoot';

export interface BattlefieldInternalEventProps {
  aggregateId: string;
  version: number;
  eventName: string;
  data: any;
}

export interface BattlefieldInternalEventPrimitives {
  id: string;
  aggregateId: string;
  version: number;
  eventName: string;
  data: any;
}

export class BattlefieldInternalEvent extends AggregateRoot<BattlefieldInternalEventProps> {
  constructor(id: Uuid, props: BattlefieldInternalEventProps) {
    super(id, props);
  }

  get name(): string {
    return this.props.eventName;
  }

  get aggregateId(): string {
    return this.props.aggregateId;
  }

  increaseVersionFrom(lastEvent: BattlefieldInternalEventPrimitives): void {
    this.props.version = lastEvent.version + 1;
  }

  toPrimitives(): BattlefieldInternalEventPrimitives {
    return {
      id: this.id.toString(),
      ...this.props
    };
  }

  static fromPrimitives(plainData: BattlefieldInternalEventPrimitives): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(plainData.id), {
      aggregateId: plainData.aggregateId,
      version: plainData.version,
      eventName: plainData.eventName,
      data: plainData.data
    });
  }
}
