import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from './BattlefieldInternalEvent';

export abstract class BattlefieldExposedEvent<
  Attributes extends Record<string, unknown>
> extends DomainEvent<Attributes> {
  abstract toBattlefieldInternalEvent(): BattlefieldInternalEvent;

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): BattlefieldExposedEvent<Record<string, unknown>> {
    throw new Error('fromBattlefieldInternalEvent not Implemented');
  }
}
