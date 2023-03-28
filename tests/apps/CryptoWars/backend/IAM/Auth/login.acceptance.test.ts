import { LOGIN } from './LoginMutation';
import { client } from '../../start';
import { createUser, hasErrors } from '../../testHelpers';
import { User } from '../../../../../../src/Contexts/IAM/Users/Domain/User';

describe('IAM - Auth', () => {
  describe('Given a user was created', () => {
    let user: User;
    beforeAll(async () => {
      user = await createUser();
    });

    it('When the credentials are correct, should login', async () => {
      const result = await client.mutate({
        mutation: LOGIN,
        variables: {
          login: {
            email: user.email.toString(),
            password: user.password.toString()
          }
        }
      });

      expect(hasErrors(result.data!.Login)).toBeFalsy();
    });
  });
});
