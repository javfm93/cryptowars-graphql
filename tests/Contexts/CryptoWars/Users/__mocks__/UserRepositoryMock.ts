import { User } from '../../../../../src/Contexts/CryptoWars/Users/Domain/User';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';
import { UserRepository } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserRepository';
import { UserEmail } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserEmail';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();
  private mockFindByEmail = jest.fn();

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }

  expectLastSavedUserToBe(expectedUser: User): void {
    expect(this.mockSave).toBeCalledWith(expectedUser);
  }

  async findByEmail(email: UserEmail): Promise<NothingOr<User>> {
    return this.mockFindByEmail(email);
  }

  whenFindByEmailThenReturn(user: NothingOr<User>): void {
    this.mockFindByEmail.mockImplementationOnce((email: UserEmail) =>
      email.isEqualTo(user?.email) ? user : null
    );
  }

  async findById(id: UserId): Promise<NothingOr<User>> {
    return this.mockFindById(id);
  }

  whenFindByIdThenReturn(user: NothingOr<User>): void {
    this.mockFindById.mockImplementationOnce(
      (id: UserId): NothingOr<User> => (id.isEqualTo(user?.id) ? user : null)
    );
  }
}
