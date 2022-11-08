import {
  BattlefieldDomainEvent,
  BattlefieldEvent,
  BattlefieldEventPrimitives
} from '../../Domain/BattlefieldEvent';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema, Repository } from 'typeorm';
import { BattlefieldEventSchema } from './typeorm/BattlefieldEventSchema';
import { BattlefieldEventRepository } from '../../Domain/BattlefieldEventRepository';

export class SqliteBattlefieldEventRepository
  extends TypeOrmRepository<BattlefieldEventPrimitives>
  implements BattlefieldEventRepository
{
  public async save(events: Array<BattlefieldDomainEvent>): Promise<void> {
    const storeEvent =
      (event: BattlefieldEvent) => async (repository: Repository<BattlefieldEventPrimitives>) => {
        const lastEvent = await repository.findOne({
          where: { aggregateId: event.aggregateId },
          order: { version: 'DESC' }
        });
        if (lastEvent) event.increaseVersionFrom(lastEvent);
        await repository.save(event.toPrimitives());
      };

    const storing = events.map(event =>
      this.executeTransaction(storeEvent(event.toBattlefieldEvent()))
    );
    await Promise.all(storing);
  }

  public async findByAggregateId(id: string): Promise<Array<BattlefieldEvent>> {
    const repository = await this.repository();
    const events = await repository.find({
      where: { aggregateId: id }
    });
    return events.map(BattlefieldEvent.fromPrimitives);
  }

  protected entitySchema(): EntitySchema<BattlefieldEventPrimitives> {
    return BattlefieldEventSchema;
  }
}
