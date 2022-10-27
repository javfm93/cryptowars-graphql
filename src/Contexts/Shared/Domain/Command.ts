export abstract class Command {
  static COMMAND_NAME: string;

  constructor(public readonly commandName: string) {}
}

export type CommandClass = {
  COMMAND_NAME: string;
};
