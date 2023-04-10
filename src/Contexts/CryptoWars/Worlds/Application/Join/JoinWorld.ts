import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { Nothing, Result, failure, success } from '../../../../Shared/Aplication/Result';
import { BaseUseCase, UseCase } from '../../../../Shared/Domain/BaseUseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { QueryBus } from '../../../../Shared/Domain/QueryBus';
import { FindPlayerQuery } from '../../../Players/Application/Find/FindPlayerQuery';
import { FindPlayerQueryResult } from '../../../Players/Application/Find/FindPlayerQueryHandler';
import { PlayerNotFound } from '../../../Players/Application/Find/PlayerNotFound';
import { Town } from '../../../Towns/Domain/Town';
import { TownId } from '../../../Towns/Domain/TownId';
import { WorldId } from '../../Domain/WorldId';
import { WorldRepository } from '../../Domain/WorldRepository';
import { FindWorldQuery } from '../Find/FindWorldQuery';
import { FindWorldQueryResult } from '../Find/FindWorldQueryHandler';
import { WorldNotFound } from '../Find/WorldNotFound';

type SelectWorldArgs = {
  userId: UserId;
  worldId: WorldId;
};

export type JoinWorldResultErrors = WorldNotFound | PlayerNotFound;
type JoinWorldResult = Result<Nothing, JoinWorldResultErrors>;

@UseCase()
export class JoinWorld implements BaseUseCase<SelectWorldArgs, Nothing> {
  constructor(
    private worldRepository: WorldRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus
  ) {}

  async execute(args: SelectWorldArgs): Promise<JoinWorldResult> {
    const query = new FindWorldQuery({ id: args.worldId.toString() });
    const worldResult = await this.queryBus.ask<FindWorldQueryResult>(query);
    if (worldResult.isFailure()) return failure(worldResult.value);
    const world = worldResult.value;

    const params = { userId: args.userId.toString(), retrieveRelations: false };
    const findPlayerQuery = new FindPlayerQuery(params);
    const playerResult: FindPlayerQueryResult = await this.queryBus.ask(findPlayerQuery);
    if (playerResult.isFailure()) return failure(playerResult.value);
    const player = playerResult.value;

    world.addPlayer(player);
    const initialTown = Town.create(TownId.random(), player.id, world.id);
    world.addTown(initialTown);

    await this.worldRepository.save(world);
    await this.eventBus.publish([...initialTown.pullDomainEvents(), ...world.pullDomainEvents()]);
    return success();
  }
}
