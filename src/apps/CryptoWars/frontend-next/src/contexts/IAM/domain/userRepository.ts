import { CommandResult } from '@/contexts/shared/application/result';
import { CreateUserErrors, LoginErrors } from '@/contexts/shared/domain/__generated__/graphql';

export abstract class UserRepository {
  abstract login(email: string, password: string): Promise<CommandResult<LoginErrors>>;
  abstract register(email: string, password: string): Promise<CommandResult<CreateUserErrors>>;
}
