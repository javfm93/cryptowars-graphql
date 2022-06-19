import { User } from '../../../../../src/Contexts/CryptoWars/Users/Domain/User';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';
import { UserRepository } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserRepository';
import { UserEmail } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserEmail';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockSearchById = jest.fn();
  private mockSearchByEmail = jest.fn();

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }

  expectLastSavedUserToBe(expectedUser: User): void {
    expect(this.mockSave).toBeCalledWith(expectedUser);
  }

  async searchByEmail(email: UserEmail): Promise<NothingOr<User>> {
    return this.mockSearchByEmail(email);
  }

  whenSearchByEmailThenReturn(value: NothingOr<User>): void {
    this.mockSearchByEmail.mockReturnValueOnce(value);
  }

  async searchById(id: UserId): Promise<NothingOr<User>> {
    return this.mockSearchById(id);
  }
}
