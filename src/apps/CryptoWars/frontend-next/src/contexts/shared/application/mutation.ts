import {
  BaseError,
  ForbiddenError,
  UnexpectedError
} from '@/contexts/shared/domain/__generated__/graphql'
import { CommandResult } from './result'
import { Reducer, useReducer } from 'react'

export type CommonErrors = UnexpectedError | ForbiddenError

export type CommandTrigger<CommandFunction, CommandErrors extends BaseError> = () => {
  execute: CommandFunction
  isExecuting: boolean
  succeeded: boolean
  error?: CommandErrors | CommonErrors
}

export type SucceededMutation<ExecuteFn> = {
  execute: ExecuteFn
  isExecuting: false
  succeeded: true
  error: null
}

export const succeededMutation = <ExecuteFn>(execute: ExecuteFn): SucceededMutation<ExecuteFn> => ({
  execute,
  isExecuting: false,
  error: null,
  succeeded: true
})

export type FailedMutation<ExecuteFn, DomainError> = {
  execute: ExecuteFn
  isExecuting: false
  succeeded: false
  error: DomainError
}

export const failedMutation = <ExecuteFn, Error>(
  execute: ExecuteFn,
  error: Error
): FailedMutation<ExecuteFn, Error> => {
  return {
    execute,
    isExecuting: false,
    succeeded: false,
    error
  }
}

export type LoadingMutation<ExecuteFn> = {
  execute: ExecuteFn
  isExecuting: true
  succeeded: false
  error: null
}

export const loadingMutation = <ExecuteFn>(execute: ExecuteFn): LoadingMutation<ExecuteFn> => ({
  execute,
  isExecuting: true,
  succeeded: false,
  error: null
})

export type ToExecuteMutation<ExecuteFn> = {
  execute: ExecuteFn
  isExecuting: false
  succeeded: false
  error: null
}

export const toExecuteMutation = <ExecuteFn>(execute: ExecuteFn): ToExecuteMutation<ExecuteFn> => ({
  execute,
  isExecuting: false,
  succeeded: false,
  error: null
})

export const handleMutationResult = <ExecutionFn, Error>(
  execute: ExecutionFn,
  isExecuting: boolean,
  called: boolean,
  error?: Error
) => {
  return error
    ? failedMutation(execute, error)
    : called && !error
    ? succeededMutation(execute)
    : isExecuting
    ? loadingMutation(execute)
    : toExecuteMutation(execute)
}


type CommandState<E extends BaseError> =
  | typeof initialState
  | typeof isExecutingState
  | typeof successState
  | ErrorState<E>

const initialState = { isExecuting: false, wasCalled: false, error: null }
const isExecutingState = { isExecuting: true, wasCalled: false, error: null }
const successState = { isExecuting: false, wasCalled: true, error: null }
type ErrorState<E extends BaseError> = {
  isExecuting: false
  wasCalled: true
  error: E | UnexpectedError
}
enum ActionTypes {
  'executing' = 'executing',
  'success' = 'success',
  'error' = 'error'
}

type Action<E> =
  | { type: ActionTypes.executing }
  | { type: ActionTypes.success; onSuccess: () => void }
  | { type: ActionTypes.error; error: E | UnexpectedError }

type ExecuteCommand<E extends BaseError> = {
  onSuccess: () => void
  toExecute: () => Promise<CommandResult<E>>
}

export const useCommand = <E extends BaseError>() => {
  type CommandReducer = Reducer<CommandState<E>, Action<E>>

  const reducer: CommandReducer = (state, action) => {
    switch (action.type) {
      case ActionTypes.executing:
        return isExecutingState
      case ActionTypes.success:
        action.onSuccess()
        return successState
      case ActionTypes.error:
        return {
          isExecuting: false,
          wasCalled: true,
          error: action.error
        }
      default:
        throw assertNeverHappen(action)
    }
  }
  const [command, dispatch] = useReducer<CommandReducer>(reducer, initialState)

  const executeCommand = async ({ onSuccess, toExecute }: ExecuteCommand<E>) => {
    dispatch({ type: ActionTypes.executing })
    const result = await toExecute()
    result.isSuccess()
      ? dispatch({ type: ActionTypes.success, onSuccess })
      : dispatch({ type: ActionTypes.error, error: result.value })
  }

  return { executeCommand, command }
}


export function assertNeverHappen(value: never) {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

