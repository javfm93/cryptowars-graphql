import { User } from '../../../../../../src/Contexts/IAM/Users/Domain/User';
import { login } from '../../IAM/IAMtestHelpers';
import { client } from '../../start';
import { GET_PLAYER } from '../Players/getPlayerQuery';

describe.skip('CryptoWars - Towns', () => {
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
      expect(player.userId).toBe(user.id.toString());
    });
  });
});
