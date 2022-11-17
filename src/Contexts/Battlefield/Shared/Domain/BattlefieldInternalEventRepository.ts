import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Army } from '../../Armies/Domain/Army';
import { BattlefieldInternalEvent } from './BattlefieldInternalEvent';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { ArmyId } from '../../Armies/Domain/ArmyId';
import { BattleId } from '../../Battles/Domain/BattleId';
import { Battle } from '../../Battles/Domain/Battle';
import { AttackId } from '../../Attacks/Domain/AttackId';
import { Attack } from '../../Attacks/Domain/Attack';
import { Battles } from '../../Battles/Domain/Battles';

export interface BattlefieldInternalEventRepository {
  save(event: Array<BattlefieldInternalEvent>): Promise<void>;

  findOneByAggregateId(id: Uuid): Promise<NothingOr<BattlefieldInternalEvent>>;

  materializeArmyByTownId(townId: Uuid): Promise<NothingOr<Army>>;

  materializeArmyByArmyId(armyId: ArmyId): Promise<NothingOr<Army>>;

  materializeBattleById(battleId: BattleId): Promise<NothingOr<Battle>>;

  materializeBattlesByArmyId(armyId: ArmyId): Promise<Battles>;

  materializeAttackById(attackId: AttackId): Promise<NothingOr<Attack>>;
}
