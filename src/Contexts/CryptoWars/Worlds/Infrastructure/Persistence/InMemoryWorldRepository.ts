import { WorldRepository } from '../../Domain/WorldRepository';
import { World } from '../../Domain/World';
import { initialWorlds } from '../../Domain/Seed/InitialWorlds';

export class InMemoryWorldRepository implements WorldRepository {
  private worlds: Array<World> = initialWorlds;

  public save(world: World): Promise<void> {
    this.worlds.push(world);
    return Promise.resolve();
  }

  getAll(): Promise<Array<World>> {
    return Promise.resolve(this.worlds);
  }

  trunk(): Promise<void> {
    this.worlds = [];
    return Promise.resolve();
  }
}
