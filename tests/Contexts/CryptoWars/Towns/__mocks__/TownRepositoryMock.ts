import { TownRepository } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownRepository';
import { Town } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Town';
import { Nullable } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';

export class TownRepositoryMock implements TownRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();

  async save(town: Town): Promise<void> {
    this.mockSave(town);
  }

  expectLastSavedTownToBe(expectedTown: Town): void {
    expect(this.mockSave).toBeCalledWith(expectedTown);
  }

  findById(id: TownId): Promise<Nullable<Town>> {
    return this.mockFindById(id);
  }
}
