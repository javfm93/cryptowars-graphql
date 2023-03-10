import { DomainEvent, DomainEventClass } from './DomainEvent';
import { Class } from './Primitives';

export interface DomainEventHandler<T extends DomainEvent<any>> {
  subscribedTo(): Array<DomainEventClass>;

  on(domainEvent: T): Promise<void>;
}

export const registeredDomainEventHandlers: Class<any>[] = [];

export const RegisterDomainEventHandler = () => {
  return (target: Class<any>): Class<any> => {
    registeredDomainEventHandlers.push(target);

    return target;
  };
};
