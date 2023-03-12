import gql from 'graphql-tag';
import { startTestServer } from '../../start';
import { FetchResult, Observable, toPromise } from 'apollo-link';
import { GraphQLRequest } from 'apollo-link/lib/types';
import { UserGenerator } from '../../../../../Contexts/IAM/Users/Domain/UserGenerator';

describe('Server - e2e', () => {
  let stop: Function, execute: (operation: GraphQLRequest) => Observable<FetchResult>;

  beforeAll(async () => {
    const testServer = await startTestServer();
    stop = testServer.stop;
    execute = testServer.executeOperation;
  });

  afterAll(() => stop());

  it('gets an user', async () => {
    const user = UserGenerator.random();
    const result = await toPromise(
      execute({
        query: CREATE_USER,
        variables: {
          user: user.toPrimitives()
        }
      })
    );

    expect(result.data?.createUser.success).toBeTruthy();
  });
});

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      ... on Success {
        success
      }
      ... on InvalidInputError {
        message
        status
      }
      ... on ConflictError {
        message
        status
      }
    }
  }
`;
