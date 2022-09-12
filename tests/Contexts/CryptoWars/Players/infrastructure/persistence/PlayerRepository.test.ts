import { PlayerGenerator } from '../../domain/PlayerGenerator';
import { PlayerRepository } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerRepository';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/Infrastructure/arranger/EnvironmentArranger';

const repository: PlayerRepository = container.get('CryptoWars.Players.PlayerRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'CryptoWars.EnvironmentArranger'
);

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('[infra] PlayerRepository', () => {
  describe('#save', () => {
    it('should save a player', async () => {
      const player = PlayerGenerator.random();

      await repository.save(player);
    });
  });

  describe('#search', () => {
    it('should return an existing player by Id', async () => {
      const expectedPlayer = PlayerGenerator.random();
      await repository.save(expectedPlayer);

      const player = await repository.findById(expectedPlayer.id);

      expect(player?.toPrimitives()).toEqual(expectedPlayer.toPrimitives());
    });

    it('should return an existing player by userId', async () => {
      const expectedPlayer = PlayerGenerator.random();
      await repository.save(expectedPlayer);

      const player = await repository.findByUserId(expectedPlayer.userId);

      expect(player?.toPrimitives()).toEqual(expectedPlayer.toPrimitives());
    });

    it('should not return a non existing player', async () => {
      expect(await repository.findById(PlayerGenerator.random().id)).toBeNull();
    });
  });
});
