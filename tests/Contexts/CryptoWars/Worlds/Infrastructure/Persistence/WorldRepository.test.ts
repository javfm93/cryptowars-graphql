import { WorldGenerator } from '../../Domain/WorldGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { WorldRepository } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';
import { WorldId } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { WorldName } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldName';
import { PlayerGenerator } from '../../../Players/Domain/PlayerGenerator';
import { TownGenerator } from '../../../Towns/Domain/TownGenerator';

const repository: WorldRepository = container.get('CryptoWars.Worlds.WorldRepository');

describe('[infra] WorldRepository', () => {
  describe('#save', () => {
    it('should save a world', async () => {
      const world = WorldGenerator.create(WorldId.create('93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b'), {
        name: new WorldName('Genesis World')
      });

      await repository.save(world);
    });
  });

  describe('#find', () => {
    it('should find an existent world', async () => {
      const expectedWorld = WorldGenerator.random();
      await repository.save(expectedWorld);

      const world = await repository.findById(expectedWorld.id);

      if (!world) fail();
      const expected = expectedWorld.toPrimitives();
      const actual = world.toPrimitives();
      expect(expectedWorld.id).toEqual(world.id);
      expect(expected.name).toEqual(actual.name);
      expect(expected.towns).toEqual(expect.arrayContaining(actual.towns));
      expect(expected.players).toEqual(expect.arrayContaining(actual.players));
    });

    it('should return all existent worlds', async () => {
      const expectedWorld = WorldGenerator.random();
      await repository.save(expectedWorld);

      const worlds = await repository.findAll();

      expect(worlds.exists(expectedWorld)).toBeTruthy();
    });
  });

  it('should get and save an update the list of players and towns in an existent world', async () => {
    const initialWorld = WorldGenerator.random();
    await repository.save(initialWorld);

    const fetchedWorld = await repository.findById(initialWorld.id);
    if (!fetchedWorld) fail();
    const playerToAdd = PlayerGenerator.random();
    const townToAdd = TownGenerator.randomFor(playerToAdd.id, initialWorld.id);
    fetchedWorld.addPlayer(playerToAdd);
    fetchedWorld.addTown(townToAdd);
    await repository.save(fetchedWorld);

    const finalWorld = await repository.findById(initialWorld.id);
    if (!finalWorld) fail();

    const expected = fetchedWorld.toPrimitives();
    const actual = finalWorld.toPrimitives();
    expect(expected.id).toEqual(actual.id);
    expect(expected.name).toEqual(actual.name);
    expect(expected.towns.length).toEqual(actual.towns.length);
    expect(expected.towns).toEqual(expect.arrayContaining(actual.towns));
    expect(expected.players.length).toEqual(actual.players.length);
    expect(expected.players).toEqual(expect.arrayContaining(actual.players));
  });
});
