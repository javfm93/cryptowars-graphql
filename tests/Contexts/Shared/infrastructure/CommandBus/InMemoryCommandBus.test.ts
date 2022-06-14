import { Command } from '../../../../../src/Contexts/Shared/Domain/Command';
import { CommandHandler } from '../../../../../src/Contexts/Shared/Domain/CommandHandler';
import { CommandNotRegisteredError } from '../../../../../src/Contexts/Shared/Domain/CommandNotRegisteredError';
import { CommandHandlersInformation } from '../../../../../src/Contexts/Shared/Infrastructure/CommandBus/CommandHandlersInformation';
import { InMemoryCommandBus } from '../../../../../src/Contexts/Shared/Infrastructure/CommandBus/InMemoryCommandBus';

class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}

class HandledCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}

class MyCommandHandler implements CommandHandler<HandledCommand> {
  subscribedTo(): HandledCommand {
    return HandledCommand;
  }

  async handle(command: HandledCommand): Promise<void> {}
}

describe('InMemoryCommandBus', () => {
  it('throws an error if dispatches a command without handler', async () => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlersInformation = new CommandHandlersInformation([]);
    const commandBus = new InMemoryCommandBus(commandHandlersInformation);

    try {
      await commandBus.dispatch(unhandledCommand);
      fail("Didn't throw");
    } catch (error) {
      expect(error).toStrictEqual(new CommandNotRegisteredError(unhandledCommand));
    }
  });

  it('accepts a command with handler', async () => {
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandler();
    const commandHandlersInformation = new CommandHandlersInformation([myCommandHandler]);
    const commandBus = new InMemoryCommandBus(commandHandlersInformation);

    await commandBus.dispatch(handledCommand);
  });
});
