import { Command } from '../../Domain/Command';
import { CommandHandler } from '../../Domain/CommandHandler';
import { CommandNotRegisteredError } from '../../Domain/CommandNotRegisteredError';

export class CommandHandlersInformation {
  private commandHandlersMap: Map<string, CommandHandler<Command>>;

  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    console.debug(`Registered ${commandHandlers.length} command handlers`);
    this.commandHandlersMap = this.formatHandlers(commandHandlers);
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<string, CommandHandler<Command>> {
    const handlersMap = new Map();

    commandHandlers.forEach(commandHandler => {
      const commandName = commandHandler.subscribedTo().COMMAND_NAME;
      if (handlersMap.has(commandName)) {
        throw Error(`A command handler for the command ${commandName} already exist`);
      }
      handlersMap.set(commandName, commandHandler);
    });

    return handlersMap;
  }

  public search(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandHandlersMap.get(command.commandName);
    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}
