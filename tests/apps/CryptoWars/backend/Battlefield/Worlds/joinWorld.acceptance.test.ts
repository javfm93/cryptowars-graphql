import { client } from '../../start';
import { hasErrors } from '../../testHelpers';
import { JOIN_WORLD } from './joinWorldMutation';
import { login } from '../../IAM/IAMtestHelpers';
import { genesisWorld } from '../../CryptoWars/cryptoWarsTestHelpers';

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
