import { UserGenerator } from '../../../../../Contexts/IAM/Users/Domain/UserGenerator';
import { client } from '../../start';
import { CREATE_USER } from './createUserMutation';
import { hasErrors } from '../../testHelpers';

describe('IAM - Users', () => {
  it('creates an user', async () => {
    const user = UserGenerator.random();
    const result = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        user: user.toPrimitives()
      }
    });

    expect(hasErrors(result.data!.createUser)).toBeFalsy();
  });
});
