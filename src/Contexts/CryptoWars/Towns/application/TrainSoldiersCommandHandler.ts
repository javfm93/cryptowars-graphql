import { TrainSoldiersCommand } from './TrainSoldiersCommand';
import { TrainSoldiers, TrainSoldiersResult } from './TrainSoldiers';
import { Either, EmptyResult } from '../../../Shared/Aplication/Result';
import { InvalidSoldier } from '../domain/InvalidSoldier';
import { InvalidNumberOfSoldiers } from '../domain/InvalidNumberOfSoldiers';
import { TownNotFound } from './TownNotFound';
import { CommandHandler } from '../../../Shared/Domain/CommandHandler';
import { Command } from '../../../Shared/Domain/Command';
import { InvalidEmailError } from '../../Users/Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../Users/Domain/Errors/InvalidPasswordError';
import { UserAlreadyTakenError } from '../../Users/Application/Create/UserAlreadyTakenError';

export type TrainSoldiersCommandErrors = InvalidSoldier | InvalidNumberOfSoldiers | TownNotFound;
export type TrainSoldiersCommandResult = Either<EmptyResult, TrainSoldiersResult>;
export type CreateUserCommandErrors =
  | InvalidEmailError
  | InvalidPasswordError
  | UserAlreadyTakenError;
export type CreateUserCommandResult = Either<EmptyResult, CreateUserCommandErrors>;

export class TrainSoldiersCommandHandler implements CommandHandler<TrainSoldiersCommand> {
  constructor(private createUser: TrainSoldiers) {}

  subscribedTo(): Command {
    return TrainSoldiersCommand;
  }

  async handle(command: TrainSoldiersCommand): Promise<TrainSoldiersCommandResult> {
    const id = UserId.create(command.id);
    const emailCreation = UserEmail.create(command.email);
    const passwordCreation = UserPassword.create(command.password);

    if (emailCreation.isFailure()) return failure(emailCreation.value);
    if (passwordCreation.isFailure()) return failure(passwordCreation.value);

    const email = emailCreation.value;
    const password = passwordCreation.value;
    const userCreation = await this.createUser.execute({ id, email, password });

    return userCreation.isSuccess() ? success() : failure(userCreation.value);
  }
}
