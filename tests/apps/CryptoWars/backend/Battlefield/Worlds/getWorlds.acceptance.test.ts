import { client } from '../../start';
import { WORLDS } from './getWorldsQuery';
import { genesisWorld } from '../../CryptoWars/cryptoWarsTestHelpers';

describe('CryptoWars - Worlds', () => {
  it('Should list available worlds', async () => {
    const result = await client.query({ query: WORLDS });
    const { worlds } = result.data.GetWorlds;
    expect(worlds).toHaveLength(1);
    expect(worlds[0].id).toBe(genesisWorld.id);
  });
});
