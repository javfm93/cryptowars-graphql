import { client } from '../../start';
import { genesisWorld } from '../../testHelpers';
import { WORLDS } from './getWorldsQuery';

describe('CryptoWars - Worlds', () => {
  it('Should list available worlds', async () => {
    const result = await client.query({ query: WORLDS });
    const { worlds } = result.data.GetWorlds;
    expect(worlds).toHaveLength(1);
    expect(worlds[0].id).toBe(genesisWorld.id);
  });
});
