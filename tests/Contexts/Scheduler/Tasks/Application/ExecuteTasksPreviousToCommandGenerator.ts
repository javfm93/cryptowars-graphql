import { ExecuteTasksPreviousToCommand } from '../../../../../src/Contexts/Scheduler/Tasks/Application/Execute/ExecuteTasksPreviousToCommand';

export class ExecuteTasksPreviousToCommandGenerator {
  static create(timestamp: number): ExecuteTasksPreviousToCommand {
    return new ExecuteTasksPreviousToCommand(timestamp);
  }

  static now(): ExecuteTasksPreviousToCommand {
    return this.create(Date.now());
  }
}
