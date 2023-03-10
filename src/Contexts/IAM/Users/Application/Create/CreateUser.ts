import { UserRepository } from '../../Domain/UserRepository';
import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { User } from '../../Domain/User';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { UserAlreadyTakenError } from './UserAlreadyTakenError';

type CreateUserArgs = {
  id: Uuid;
  email: UserEmail;
  password: UserPassword;
};

type CreateUserResult = Either<EmptyResult, UserAlreadyTakenError>;

@RegisterUseCase()
export class CreateUser implements UseCase<CreateUserArgs, EmptyResult> {
  constructor(private userRepository: UserRepository, private eventBus: EventBus) {}

  async execute({ id, email, password }: CreateUserArgs): Promise<CreateUserResult> {
    const user = User.create(id, { email, password });
    const userAlreadyExist = await this.userRepository.findByEmail(email);
    if (userAlreadyExist) return failure(new UserAlreadyTakenError(email.toString()));
    await this.userRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    return success();
  }
}
