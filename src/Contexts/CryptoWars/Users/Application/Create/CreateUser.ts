import { UserRepository } from '../../Domain/UserRepository';
import { UseCase } from '../../../../Shared/domain/UseCase';
import { User } from '../../Domain/User';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';

interface CreateUserArgs {
  id: Uuid;
  email: UserEmail;
  password: UserPassword;
}

export class CreateUser implements UseCase<CreateUserArgs, void> {
  constructor(private userRepository: UserRepository, private eventBus: EventBus) {}

  async execute({ id, email, password }: CreateUserArgs): Promise<void> {
    const user = User.create(id, { email, password });
    await this.userRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
