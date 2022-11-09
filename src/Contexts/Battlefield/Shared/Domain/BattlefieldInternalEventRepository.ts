import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Army } from '../../Armies/Domain/Army';
import { BattlefieldInternalEvent } from './BattlefieldInternalEvent';

export interface BattlefieldInternalEventRepository {
  save(event: Array<BattlefieldInternalEvent>): Promise<void>;

  materializeArmyByTownId(townId: Uuid): Promise<Army>;

  findByAggregateId(id: string): Promise<Array<BattlefieldInternalEvent>>;
}
