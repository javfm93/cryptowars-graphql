import { client } from '../../start';
import { createPlayerInWorld, genesisWorld, hasErrors } from '../../testHelpers';
import { WORLD_MAP } from './getWorldMapQuery';
import { GetPlayerQuery } from '../../__generated__/graphql';
import { PickOperationUnionMember } from '../../../../../../src/apps/CryptoWars/frontend/src/Types/grahql';

describe('CryptoWars - Worlds', () => {
  describe('Given I joined a world', () => {
    let player: PickOperationUnionMember<GetPlayerQuery['GetPlayer'], 'Player'>;
    beforeEach(async () => {
      player = await createPlayerInWorld();
    });

    it('Should be able to see worlds map information ', async () => {
      const result = await client.query({
        query: WORLD_MAP,
        variables: { id: genesisWorld.id }
      });

      const worldMap = result.data.GetWorldMap;
      expect(hasErrors(worldMap)).toBeFalsy();
      if (!hasErrors(worldMap)) {
        expect(worldMap.name).toBe(genesisWorld.name);
        expect(worldMap.id).toBe(genesisWorld.id);
        expect(worldMap.towns).toHaveLength(1);
        expect(worldMap.towns[0].playerId).toBe(player.id);
      }
    });
  });
});
