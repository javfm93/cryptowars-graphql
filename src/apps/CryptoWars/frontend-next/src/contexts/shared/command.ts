import { BaseError, ForbiddenError, UnexpectedError } from '@/__generated__/graphql';

export type CommonErrors = UnexpectedError | ForbiddenError;

export type CommandTrigger<CommandFunction, CommandErrors extends BaseError> = () => {
  execute: CommandFunction;
  isExecuting: boolean;
  succeeded: boolean;
  error?: CommandErrors | CommonErrors;
};

export type SucceededMutation<ExecuteFn> = {
  execute: ExecuteFn;
  isExecuting: false;
  succeeded: true;
  error: null;
};

export const succeededMutation = <ExecuteFn>(execute: ExecuteFn): SucceededMutation<ExecuteFn> => ({
  execute,
  isExecuting: false,
  error: null,
  succeeded: true
});

export type FailedMutation<ExecuteFn, DomainError> = {
  execute: ExecuteFn;
  isExecuting: false;
  succeeded: false;
  error: DomainError;
};

export const failedMutation = <ExecuteFn, Error>(
  execute: ExecuteFn,
  error: Error
): FailedMutation<ExecuteFn, Error> => ({
  execute,
  isExecuting: false,
  succeeded: false,
  error
});

export type LoadingMutation<ExecuteFn> = {
  execute: ExecuteFn;
  isExecuting: true;
  succeeded: false;
  error: null;
};

export const loadingMutation = <ExecuteFn>(execute: ExecuteFn): LoadingMutation<ExecuteFn> => ({
  execute,
  isExecuting: true,
  succeeded: false,
  error: null
});

export type ToExecuteMutation<ExecuteFn> = {
  execute: ExecuteFn;
  isExecuting: false;
  succeeded: false;
  error: null;
};

export const toExecuteMutation = <ExecuteFn>(execute: ExecuteFn): ToExecuteMutation<ExecuteFn> => ({
  execute,
  isExecuting: false,
  succeeded: false,
  error: null
});

export const handleMutationResult = <ExecutionFn, Error>(
  execute: ExecutionFn,
  isExecuting: boolean,
  called: boolean,
  error?: Error
) =>
  error
    ? failedMutation(execute, error)
    : called && !error
    ? succeededMutation(execute)
    : isExecuting
    ? loadingMutation(execute)
    : toExecuteMutation(execute);

export function assertNeverHappen(value: never) {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}
