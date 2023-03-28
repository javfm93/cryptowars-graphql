import { client } from '../../start';
import { createPlayerInWorld, hasErrors } from '../../testHelpers';
import { PickOperationUnionMember } from '../../../../../../src/apps/CryptoWars/frontend/src/Types/grahql';
import { GetPlayerQuery } from '../../__generated__/graphql';
import { TRAIN_SOLDIERS } from './trainSoldiersMutation';

describe('CryptoWars - Towns', () => {
  describe('Given I joined a world', () => {
    let player: PickOperationUnionMember<GetPlayerQuery['GetPlayer'], 'Player'>;
    beforeEach(async () => {
      player = await createPlayerInWorld();
    });

    it('Should be able to train a new soldier', async () => {
      const result = await client.mutate({
        mutation: TRAIN_SOLDIERS,
        variables: { input: { townId: player.towns[0].id, soldiers: { basic: 1, range: 0 } } }
      });
      expect(hasErrors(result.data!.TrainSoldiers)).toBeFalsy();
    });
  });
});
