import { BattlefieldInternalEventRepository } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEventRepository';
import { BattlefieldInternalEvent } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEvent';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { Uuid } from '../../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { Attack } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/Attack';
import { AttackId } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackId';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { BattleId } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleId';
import { Battles } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battles';

export class BattlefieldEventsRepositoryMock implements BattlefieldInternalEventRepository {
  private mockSave = jest.fn();
  private mockFindByAggregateId = jest.fn();
  private mockMaterializeArmyByTownId = jest.fn();
  private mockMaterializeArmyByArmyId = jest.fn();
  private mockMaterializeBattleById = jest.fn();
  private mockMaterializeAttackById = jest.fn();
  private mockMaterializeBattlesByArmyId = jest.fn();

  async save(event: Array<BattlefieldInternalEvent>): Promise<void> {
    this.mockSave(event);
  }

  expectLastSavedBattlefieldEventsToBe(
    expectedBattlefieldEvent: Array<BattlefieldInternalEvent>
  ): void {
    expect(this.mockSave).toBeCalledWith(expectedBattlefieldEvent);
  }

  expectSavedNotToBeCalled(): void {
    expect(this.mockSave).not.toBeCalled();
  }

  async findOneByAggregateId(id: Uuid): Promise<NothingOr<BattlefieldInternalEvent>> {
    return this.mockFindByAggregateId(id);
  }

  whenFindByAggregateIdThenReturn(event: BattlefieldInternalEvent): void {
    this.mockFindByAggregateId.mockImplementationOnce(
      (id: Uuid): NothingOr<BattlefieldInternalEvent> => {
        return id.toString() === event.aggregateId ? event : null;
      }
    );
  }

  materializeArmyByTownId(townId: TownId): Promise<Army> {
    return this.mockMaterializeArmyByTownId(townId);
  }

  whenMaterializeArmyByTownIdThenReturn(army: Army): void {
    this.mockMaterializeArmyByTownId.mockImplementationOnce(
      (townId: TownId): NothingOr<Army> => (townId.isEqualTo(army.townId) ? army : null)
    );
  }

  materializeArmyByArmyId(armyId: ArmyId): Promise<NothingOr<Army>> {
    return this.mockMaterializeArmyByArmyId(armyId);
  }

  whenMaterializeArmyByArmyIdThenReturn(army: Army): void {
    this.mockMaterializeArmyByArmyId.mockImplementationOnce(
      (armyId: ArmyId): NothingOr<Army> => (armyId.isEqualTo(army.id) ? army : null)
    );
  }

  materializeBattleById(battleId: BattleId): Promise<NothingOr<Battle>> {
    return this.mockMaterializeBattleById(battleId);
  }

  whenMaterializeBattleByIdThenReturn(battle: Battle): void {
    this.mockMaterializeBattleById.mockImplementationOnce(
      (battleId: BattleId): NothingOr<Battle> => (battleId.isEqualTo(battle.id) ? battle : null)
    );
  }

  materializeAttackById(attackId: AttackId): Promise<NothingOr<Attack>> {
    return this.mockMaterializeAttackById(attackId);
  }

  whenMaterializeAttackByIdThenReturn(attack: Attack): void {
    this.mockMaterializeAttackById.mockImplementationOnce(
      (attackId: AttackId): NothingOr<Attack> => (attackId.isEqualTo(attack.id) ? attack : null)
    );
  }

  materializeBattlesByArmyId(armyId: ArmyId): Promise<Battles> {
    return this.mockMaterializeBattlesByArmyId(armyId);
  }

  whenMaterializeBattlesByArmyIdThenReturn(armyIdParam: ArmyId, battles: Battles): void {
    this.mockMaterializeBattlesByArmyId.mockImplementationOnce(
      (armyId: ArmyId): Battles => (armyIdParam.isEqualTo(armyId) ? battles : Battles.create())
    );
  }

  resetMocks(): void {
    this.mockSave.mockReset();
    this.mockFindByAggregateId.mockReset();
    this.mockMaterializeArmyByTownId.mockReset();
    this.mockMaterializeArmyByArmyId.mockReset();
    this.mockMaterializeBattleById.mockReset();
    this.mockMaterializeAttackById.mockReset();
    this.mockMaterializeBattlesByArmyId.mockReset();
  }
}
