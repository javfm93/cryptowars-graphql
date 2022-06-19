import { World } from './World';

export interface WorldRepository {
  getAll(): Promise<Array<World>>;
  save(world: World): Promise<void>;
}
