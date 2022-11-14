import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { ArmyRepository } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyRepository';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';

export class ArmyRepositoryMock implements ArmyRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();
  private mockFindByTownId = jest.fn();

  async save(army: Army): Promise<void> {
    this.mockSave(army);
  }

  expectLastSavedArmyToBe(expectedArmy: Army): void {
    expect(this.mockSave).toBeCalledWith(expectedArmy);
  }

  async findById(id: ArmyId): Promise<NothingOr<Army>> {
    return this.mockFindById(id);
  }

  whenFindByIdThenReturn(army: NothingOr<Army>): void {
    this.mockFindById.mockImplementationOnce(
      (id: ArmyId): NothingOr<Army> => (id.isEqualTo(army?.id) ? army : null)
    );
  }

  async findByTownId(id: TownId): Promise<NothingOr<Army>> {
    return this.mockFindByTownId(id);
  }

  whenFindByTownIdThenReturn(army: Army): void {
    this.mockFindByTownId.mockImplementationOnce((id: TownId): NothingOr<Army> => {
      return id.isEqualTo(army?.townId) ? Army.fromPrimitives(army.toPrimitives()) : null;
    });
  }
}
