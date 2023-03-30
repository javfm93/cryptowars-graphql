import { BaseError } from './__generated__/graphql';

export const hasErrors = function <T>(operation: object): operation is BaseError {
  return 'error' in operation;
};

export const hasDomainErrors = function <T>(operation: object): operation is BaseError {
  return 'error' in operation;
};

export const hasResult = function <T extends { entity: unknown }>(
  operation: object
): operation is T {
  return 'entity' in operation;
};
