import { Uuid } from './value-object/Uuid';
import { Optional, Primitives } from './Primitives';

export type OptionalDomainEventProps<T extends DomainEvent<Record<string, unknown>>> = Optional<
  Primitives<T>,
  'id' | 'occurredOn' | 'type' | 'attributes' | 'meta'
>;

export abstract class DomainEvent<Attributes extends Record<string, unknown>> {
  static TYPE: string;
  static fromPrimitives: (...args: any[]) => DomainEvent<Record<string, unknown>>;

  constructor(
    readonly type: string,
    readonly aggregateId: string,
    readonly attributes: Attributes = {} as Attributes,
    readonly meta: Record<string, unknown> = {},
    readonly occurredOn: Date = new Date(),
    readonly id: string = Uuid.random().toString()
  ) {}

  toPrimitives(): Primitives<DomainEvent<never>> & { attributes: Attributes } {
    return {
      type: this.type,
      aggregateId: this.aggregateId,
      id: this.id,
      occurredOn: this.occurredOn,
      meta: this.meta,
      attributes: this.attributes
    };
  }
}

export type DomainEventClass = {
  TYPE: string;
  fromPrimitives(...args: any[]): DomainEvent<Record<string, unknown>>;
};
