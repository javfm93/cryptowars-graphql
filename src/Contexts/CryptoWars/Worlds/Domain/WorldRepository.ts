import { World } from './World';
import { WorldId } from './WorldId';
import { Worlds } from './Worlds';
import { NothingOr } from '../../../Shared/Domain/Nullable';

export abstract class WorldRepository {
  abstract findAll(): Promise<Worlds>;
  abstract findById(worldId: WorldId): Promise<NothingOr<World>>;
  abstract save(world: World): Promise<void>;
}
