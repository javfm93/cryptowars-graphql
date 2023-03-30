import { BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { User } from '../../Domain/User';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { UserRepository } from '../../Domain/UserRepository';
import { UserId } from '../../Domain/UserId';
import { UserNotFound } from '../Create/UserNotFound';

type FindUserResult = Result<User, DomainError>;

export class FindUser implements BaseUseCase<UserId, User> {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: UserId): Promise<FindUserResult> {
    const user = await this.userRepository.findById(userId);
    return user ? successAndReturn(user) : failure(new UserNotFound());
  }
}
