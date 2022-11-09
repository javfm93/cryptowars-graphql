import { BattlefieldInternalEventRepository } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEventRepository';
import { BattlefieldInternalEvent } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEvent';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';

export class BattlefieldEventsRepositoryMock implements BattlefieldInternalEventRepository {
  private mockSave = jest.fn();
  private mockFindByAggregateId = jest.fn();
  private mockMaterializeArmyByTownId = jest.fn();

  async save(event: Array<BattlefieldInternalEvent>): Promise<void> {
    this.mockSave(event);
  }

  expectLastSavedBattlefieldEventToBe(
    expectedBattlefieldEvent: Array<BattlefieldInternalEvent>
  ): void {
    expect(this.mockSave).toBeCalledWith(expectedBattlefieldEvent);
  }

  async findByAggregateId(id: string): Promise<Array<BattlefieldInternalEvent>> {
    return this.mockFindByAggregateId(id);
  }

  whenFindByAggregateIdThenReturn(event: BattlefieldInternalEvent): void {
    this.mockFindByAggregateId.mockImplementationOnce(
      (id: string): Array<BattlefieldInternalEvent> => (id === event.aggregateId ? [event] : [])
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
}
