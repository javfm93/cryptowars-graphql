import {
  BattlefieldInternalEvent,
  BattlefieldInternalEventPrimitives
} from '../../Domain/BattlefieldInternalEvent';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema, Repository } from 'typeorm';
import { BattlefieldEventSchema } from './typeorm/BattlefieldEventSchema';
import { BattlefieldInternalEventRepository } from '../../Domain/BattlefieldInternalEventRepository';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { Army } from '../../../Armies/Domain/Army';

export class SqliteBattlefieldEventRepository
  extends TypeOrmRepository<BattlefieldInternalEventPrimitives>
  implements BattlefieldInternalEventRepository
{
  public async save(events: Array<BattlefieldInternalEvent>): Promise<void> {
    const storeEvent =
      (event: BattlefieldInternalEvent) =>
      async (repository: Repository<BattlefieldInternalEventPrimitives>) => {
        const lastEvent = await repository.findOne({
          where: { aggregateId: event.aggregateId },
          order: { version: 'DESC' }
        });
        if (lastEvent) event.increaseVersionFrom(lastEvent);
        await repository.save(event.toPrimitives());
      };

    for (const event of events) {
      await this.executeTransaction(storeEvent(event));
    }
  }

  public async materializeArmyByTownId(townId: Uuid): Promise<Army> {
    const repository = await this.repository();
    const events = await repository
      .createQueryBuilder()
      .where("json_extract(data, '$.townId') = :townId", { townId: townId.toString() })
      .getMany();
    return Army.materializeFrom(events.map(BattlefieldInternalEvent.fromPrimitives));
  }

  public async findByAggregateId(id: string): Promise<Array<BattlefieldInternalEvent>> {
    const repository = await this.repository();
    const events = await repository.find({
      where: { aggregateId: id }
    });
    return events.map(BattlefieldInternalEvent.fromPrimitives);
  }

  protected entitySchema(): EntitySchema<BattlefieldInternalEventPrimitives> {
    return BattlefieldEventSchema;
  }
}
