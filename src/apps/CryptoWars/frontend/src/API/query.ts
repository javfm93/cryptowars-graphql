export type SucceededQuery<Result> = {
  result: Result;
  isLoading: false;
  error: null;
};

export const succeededQuery = <Result>(result: Result): SucceededQuery<Result> => ({
  result,
  isLoading: false,
  error: null
});

export type FailedQuery<DomainError> = {
  result: null;
  isLoading: false;
  error: DomainError;
};

export const failedQuery = <Error>(error: Error): FailedQuery<Error> => ({
  result: null,
  isLoading: false,
  error
});

export type LoadingQuery = {
  result: null;
  isLoading: true;
  error: null;
};

export const loadingQuery = (): LoadingQuery => ({
  result: null,
  isLoading: true,
  error: null
});

export const handleQueryResult = <Result, Error>(result: Result, error?: Error) =>
  result ? succeededQuery(result) : error ? failedQuery(error) : loadingQuery();

export type QueryTrigger<Args, Response, DomainError> = (
  args: Args
) => SucceededQuery<Response> | LoadingQuery | FailedQuery<DomainError>;
