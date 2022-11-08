import { BattlefieldEventRepository } from '../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldEventRepository';
import {
  BattlefieldDomainEvent,
  BattlefieldEvent
} from '../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldEvent';

export class BattlefieldEventsRepositoryMock implements BattlefieldEventRepository {
  private mockSave = jest.fn();
  private mockFindByAggregateId = jest.fn();

  async save(event: Array<BattlefieldDomainEvent>): Promise<void> {
    this.mockSave(event);
  }

  expectLastSavedBattlefieldEventToBe(expectedBattlefieldEvent: BattlefieldEvent): void {
    expect(this.mockSave).toBeCalledWith(expectedBattlefieldEvent);
  }

  async findByAggregateId(id: string): Promise<Array<BattlefieldEvent>> {
    return this.mockFindByAggregateId(id);
  }

  whenFindByAggregateIdThenReturn(event: BattlefieldEvent): void {
    this.mockFindByAggregateId.mockImplementationOnce(
      (id: string): Array<BattlefieldEvent> =>
        id === event?.aggregateId ? [BattlefieldEvent.fromPrimitives(event.toPrimitives())] : []
    );
  }
}
