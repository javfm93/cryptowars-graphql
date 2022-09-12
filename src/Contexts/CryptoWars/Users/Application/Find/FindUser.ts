import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { User } from '../../Domain/User';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { UserRepository } from '../../Domain/UserRepository';
import { UserId } from '../../Domain/UserId';
import { UserNotFound } from '../Create/UserNotFound';

type FindUserResult = Either<User, DomainError>;

export class FindUser implements UseCase<UserId, User> {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: UserId): Promise<FindUserResult> {
    const user = await this.userRepository.findById(userId);
    return user ? successAndReturn(user) : failure(new UserNotFound());
  }
}
