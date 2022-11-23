import { Command } from '../../../../Shared/Domain/Command';

export class ExecuteTasksPreviousToCommand extends Command {
  static COMMAND_NAME = 'ExecuteTasksPreviousTo';

  constructor(readonly timestamp: number) {
    super(ExecuteTasksPreviousToCommand.COMMAND_NAME);
  }
}
