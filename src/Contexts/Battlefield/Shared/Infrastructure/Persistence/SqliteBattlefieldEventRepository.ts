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
import { NothingOr, Nullable } from '../../../../Shared/Domain/Nullable';
import { ArmyId } from '../../../Armies/Domain/ArmyId';
import { BattleId } from '../../../Battles/Domain/BattleId';
import { Battle } from '../../../Battles/Domain/Battle';
import { Attack } from '../../../Attacks/Domain/Attack';
import { AttackId } from '../../../Attacks/Domain/AttackId';
import { Battles } from '../../../Battles/Domain/Battles';

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

  public async findOneByAggregateId(id: Uuid): Promise<Nullable<BattlefieldInternalEvent>> {
    const repository = await this.repository();
    const event = await repository.findOne({
      where: { aggregateId: id.toString() }
    });
    return event ? BattlefieldInternalEvent.fromPrimitives(event) : null;
  }

  public async materializeArmyByTownId(townId: Uuid): Promise<NothingOr<Army>> {
    const repository = await this.repository();
    const armyEvent = await repository
      .createQueryBuilder()
      .where("json_extract(data, '$.townId') = :townId", { townId: townId.toString() })
      .getOne();
    if (!armyEvent) return null;
    return this.materializeArmyByArmyId(ArmyId.create(armyEvent.aggregateId));
  }

  public async materializeArmyByArmyId(id: ArmyId): Promise<NothingOr<Army>> {
    const events = await this.findByAggregateId(id);
    return events.length
      ? Army.materializeFrom(events.map(BattlefieldInternalEvent.fromPrimitives))
      : null;
  }

  async materializeBattleById(id: BattleId): Promise<NothingOr<Battle>> {
    const events = await this.findByAggregateId(id);
    return events.length
      ? Battle.materializeFrom(events.map(BattlefieldInternalEvent.fromPrimitives))
      : null;
  }

  async materializeBattlesByArmyId(armyId: ArmyId): Promise<Battles> {
    const events = await this.findBattlesByArmyId(armyId.toString());
    return events.length
      ? Battles.materializeFrom(events.map(BattlefieldInternalEvent.fromPrimitives))
      : Battles.create();
  }

  async materializeAttackById(id: AttackId): Promise<NothingOr<Attack>> {
    const events = await this.findByAggregateId(id);
    return events.length
      ? Attack.materializeFrom(events.map(BattlefieldInternalEvent.fromPrimitives))
      : null;
  }

  private async findByAggregateId(uuid: Uuid): Promise<Array<BattlefieldInternalEventPrimitives>> {
    const repository = await this.repository();
    return repository.find({ where: { aggregateId: uuid.toString() } });
  }

  private async findBattlesByArmyId(
    armyId: string
  ): Promise<Array<BattlefieldInternalEventPrimitives>> {
    const repository = await this.repository();
    return repository
      .createQueryBuilder()
      .where("json_extract(data, '$.attack.attackerTroop.armyId') = :armyId", {
        armyId
      })
      .getMany();
  }

  protected entitySchema(): EntitySchema<BattlefieldInternalEventPrimitives> {
    return BattlefieldEventSchema;
  }
}
