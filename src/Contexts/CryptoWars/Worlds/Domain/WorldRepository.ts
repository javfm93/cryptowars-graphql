import { World } from './World';
import { WorldId } from './WorldId';
import { Worlds } from './Worlds';
import { NothingOr } from '../../../Shared/Domain/Nullable';

export interface WorldRepository {
  findAll(): Promise<Worlds>;
  findById(worldId: WorldId): Promise<NothingOr<World>>;
  save(world: World): Promise<void>;
}
