import { ArmyRepository } from '../../Domain/ArmyRepository';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { ArmyId } from '../../Domain/ArmyId';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema } from 'typeorm';
import { ArmySchema } from './typeorm/ArmySchema';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Army } from '../../Domain/Army';

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

  protected entitySchema(): EntitySchema<Primitives<Army>> {
    return ArmySchema;
  }
}
