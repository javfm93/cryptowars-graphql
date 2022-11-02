import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { UserId } from '../../../Users/Domain/UserId';
import { WorldId } from '../../Domain/WorldId';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { QueryBus } from '../../../../Shared/Domain/QueryBus';
import { FindWorldQuery } from '../Find/FindWorldQuery';
import { FindWorldQueryResult } from '../Find/FindWorldQueryHandler';
import { Town } from '../../../Towns/domain/Town';
import { TownId } from '../../../Towns/domain/TownId';
import { FindPlayerQuery } from '../../../Players/Application/Find/FindPlayerQuery';
import { FindPlayerQueryResult } from '../../../Players/Application/Find/FindPlayerQueryHandler';
import { WorldRepository } from '../../Domain/WorldRepository';

type SelectWorldArgs = {
  userId: UserId;
  worldId: WorldId;
};

type SelectWorldResult = Either<EmptyResult, DomainError>;

export class JoinWorld implements UseCase<SelectWorldArgs, EmptyResult> {
  constructor(
    private worldRepository: WorldRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus
  ) {}

  async execute(args: SelectWorldArgs): Promise<SelectWorldResult> {
    const query = new FindWorldQuery({ id: args.worldId.toString() });
    const worldResult: FindWorldQueryResult = await this.queryBus.ask(query);
    if (worldResult.isFailure()) return failure(worldResult.value);
    const world = worldResult.value;

    const findPlayerQuery = new FindPlayerQuery({ userId: args.userId.toString() });
    const playerResult: FindPlayerQueryResult = await this.queryBus.ask(findPlayerQuery);
    if (playerResult.isFailure()) return failure(playerResult.value);
    const player = playerResult.value;

    world.addPlayer(player);
    const initialTown = Town.create(TownId.random(), { playerId: player.id, worldId: world.id });
    world.addTown(initialTown);

    await this.worldRepository.save(world);
    await this.eventBus.publish([...initialTown.pullDomainEvents(), ...world.pullDomainEvents()]);
    return success();
  }
}