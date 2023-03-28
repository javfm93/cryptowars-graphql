import { User } from '../../../../../../src/Contexts/IAM/Users/Domain/User';
import { client } from '../../start';
import { hasErrors, login } from '../../testHelpers';
import { GET_PLAYER } from './getPlayerQuery';

describe('CryptoWars - Players', () => {
  describe('Given im login', () => {
    let user: User;
    beforeAll(async () => {
      user = await login();
    });

    it('should retrieve my player information', async () => {
      const result = await client.query({
        query: GET_PLAYER
      });

      const player = result.data.GetPlayer;
      expect(hasErrors(player)).toBeFalsy();
      if (!hasErrors(player)) {
        expect(player.userId).toBe(user.id.toString());
      }
    });
  });
});
