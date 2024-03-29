import { ArmyRepository } from '../../Domain/ArmyRepository';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { ArmyId } from '../../Domain/ArmyId';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntityTarget } from 'typeorm';
import { ArmySchema } from './ArmySchema';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Army } from '../../Domain/Army';

@RegisterRepository(ArmyRepository)
export class SqliteArmyRepository
  extends TypeOrmRepository<Primitives<Army>>
  implements ArmyRepository
{
  public save(army: Army): Promise<void> {
    return this.persist(army.toPrimitives());
  }

  public async findById(id: ArmyId): Promise<NothingOr<Army>> {
    const repository = await this.repository();
    const army = await repository.findOne({
      where: { id: id.toString() }
    });
    return army ? Army.fromPrimitives(army) : null;
  }

  public async findByTownId(townId: TownId): Promise<NothingOr<Army>> {
    const repository = await this.repository();
    const army = await repository.findOne({
      where: { townId: townId.toString() }
    });
    return army ? Army.fromPrimitives(army) : null;
  }

  protected entitySchema(): EntityTarget<Primitives<Army>> {
    return ArmySchema;
  }
}
