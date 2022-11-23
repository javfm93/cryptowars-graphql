import { Uuid } from './value-object/Uuid';
import { Optional, Primitives } from './Primitives';

export type OptionalDomainEventProps<T extends DomainEvent> = Optional<
  Primitives<T>,
  'eventId' | 'occurredOn' | 'eventName'
>;
// {
//   "data": {
//     "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
//     "type": "course.created",
//     "occurred_on": "2019-08-08T08:37:32+00:00",
//     "aggregateId": "8c900b20-e04a-4777-9183-32faab6d2fb5",
//     "attributes": {
//     "name": "DDD en PHP!",
//       "duration": "25 hours"
//     },
//     "meta" : {
//       "host": "111.26.06.93"
//     }
//   }
// }

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (...args: any[]) => any;
  readonly eventName: string;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.eventName = eventName;
    this.aggregateId = aggregateId;
    this.eventId = eventId || Uuid.random().toString();
    this.occurredOn = occurredOn || new Date();
  }

  abstract toPrimitive(): Primitives<DomainEvent>;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(...args: any[]): DomainEvent;
};
