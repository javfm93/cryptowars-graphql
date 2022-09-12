import { VillageRepository } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/VillageRepository';
import { Village } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/Village';
import { Nullable } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { VillageId } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/VillageId';

export class VillageRepositoryMock implements VillageRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockFindById = jest.fn();

  async save(user: Village): Promise<void> {
    this.mockSave(user);
  }

  expectLastSavedUserToBe(expectedUser: Village): void {
    expect(this.mockSave).toBeCalledWith(expectedUser);
  }

  async search(id: VillageId): Promise<Nullable<Village>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(value: Nullable<Village>): void {
    this.mockSearch.mockReturnValueOnce(value);
  }

  expectLastSearchedUserTobe(expected: VillageId): void {
    expect(this.mockSearch).toBeCalledWith(expected);
  }

  findById(id: VillageId): Promise<Nullable<Village>> {
    return this.mockFindById(id);
  }
}
