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

export abstract class BattlefieldInternalEventRepository {
  abstract save(event: Array<BattlefieldInternalEvent>): Promise<void>;

  abstract findOneByAggregateId(id: Uuid): Promise<NothingOr<BattlefieldInternalEvent>>;

  abstract materializeArmyByTownId(townId: Uuid): Promise<NothingOr<Army>>;

  abstract materializeArmyByArmyId(armyId: ArmyId): Promise<NothingOr<Army>>;

  abstract materializeBattleById(battleId: BattleId): Promise<NothingOr<Battle>>;

  abstract materializeBattlesByArmyId(armyId: ArmyId): Promise<Battles>;

  abstract materializeAttackById(attackId: AttackId): Promise<NothingOr<Attack>>;
}
