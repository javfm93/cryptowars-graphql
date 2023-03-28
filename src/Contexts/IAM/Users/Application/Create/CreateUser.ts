import { UserRepository } from '../../Domain/UserRepository';
import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { User } from '../../Domain/User';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { UserAlreadyTakenError } from './UserAlreadyTakenError';
import { UserName } from '../../Domain/UserName';

type CreateUserArgs = {
  id: Uuid;
  email: UserEmail;
  password: UserPassword;
  name: UserName;
};

export type CreateUserErrors = UserAlreadyTakenError;
type CreateUserResult = Either<EmptyResult, CreateUserErrors>;

@RegisterUseCase()
export class CreateUser implements UseCase<CreateUserArgs, EmptyResult> {
  constructor(private userRepository: UserRepository, private eventBus: EventBus) {}

  async execute({ id, email, password, name }: CreateUserArgs): Promise<CreateUserResult> {
    const user = User.create(id, email, password, name);
    const userAlreadyExist = await this.userRepository.findByEmail(email);
    if (userAlreadyExist) return failure(new UserAlreadyTakenError(email.toString()));
    await this.userRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    return success();
  }
}
