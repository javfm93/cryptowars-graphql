import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from './BattlefieldInternalEvent';

export abstract class BattlefieldExposedEvent extends DomainEvent {
  abstract toBattlefieldInternalEvent(): BattlefieldInternalEvent;

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): BattlefieldExposedEvent {
    throw new Error('fromBattlefieldInternalEvent not Implemented');
  }
}
