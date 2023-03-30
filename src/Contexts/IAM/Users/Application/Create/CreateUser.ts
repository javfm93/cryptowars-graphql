import { UserRepository } from '../../Domain/UserRepository';
import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { User } from '../../Domain/User';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { UserAlreadyTakenError } from './UserAlreadyTakenError';
import { UserName } from '../../Domain/UserName';

type CreateUserArgs = {
  id: Uuid;
  email: UserEmail;
  password: UserPassword;
  name: UserName;
};

export type CreateUserErrors = UserAlreadyTakenError;
type CreateUserResult = Result<Nothing, CreateUserErrors>;

@UseCase()
export class CreateUser implements BaseUseCase<CreateUserArgs, Nothing> {
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
