import { WorldRepository } from '../../Domain/WorldRepository';
import { World } from '../../Domain/World';
import { initialWorlds } from '../../Domain/Seed/InitialWorlds';
import { Worlds } from '../../Domain/Worlds';
import { WorldId } from '../../Domain/WorldId';
import { NothingOr } from '../../../../Shared/Domain/Nullable';

export class InMemoryWorldRepository implements WorldRepository {
  private worlds: Worlds = initialWorlds;

  public save(world: World): Promise<void> {
    this.worlds.add(world);
    return Promise.resolve();
  }

  findById(worldId: WorldId): Promise<NothingOr<World>> {
    return Promise.resolve(
      this.worlds.getItems().find(world => world.id.isEqualTo(worldId)) ?? null
    );
  }

  findAll(): Promise<Worlds> {
    return Promise.resolve(this.worlds);
  }

  trunk(): Promise<void> {
    this.worlds = Worlds.create();
    return Promise.resolve();
  }
}
