import { BattlefieldDomainEvent, BattlefieldEvent } from './BattlefieldEvent';

export interface BattlefieldEventRepository {
  save(event: Array<BattlefieldDomainEvent>): Promise<void>;

  findByAggregateId(id: string): Promise<Array<BattlefieldEvent>>;
}
