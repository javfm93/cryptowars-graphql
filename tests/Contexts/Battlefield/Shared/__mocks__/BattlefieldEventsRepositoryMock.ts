import { BattlefieldInternalEventRepository } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEventRepository';
import { BattlefieldInternalEvent } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';

export class BattlefieldEventsRepositoryMock implements BattlefieldInternalEventRepository {
  private mockSave = jest.fn();
  private mockFindByAggregateId = jest.fn();

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

  materializeArmyByTownId(townId: Uuid): Promise<Army> {
    throw new Error('Method not implemented.');
  }
}
