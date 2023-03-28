import { client } from '../../start';
import { genesisWorld, hasErrors, login } from '../../testHelpers';
import { JOIN_WORLD } from './joinWorldMutation';

describe('CryptoWars - Worlds', () => {
  describe('Given im login', () => {
    beforeAll(async () => {
      await login();
    });

    it('Should be able to join a world', async () => {
      const result = await client.mutate({
        mutation: JOIN_WORLD,
        variables: { id: genesisWorld.id }
      });

      expect(hasErrors(result.data!.JoinWorld)).toBeFalsy();
    });
  });
});
