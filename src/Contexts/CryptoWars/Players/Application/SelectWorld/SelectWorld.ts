import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { UserId } from '../../../Users/Domain/UserId';
import { WorldId } from '../../../Worlds/Domain/WorldId';
import { PlayerRepository } from '../../Domain/PlayerRepository';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { PlayerNotFound } from './PlayerNotFound';
import { QueryBus } from '../../../../Shared/Domain/QueryBus';
import { FindWorldQuery } from '../../../Worlds/Application/Find/FindWorldQuery';
import { FindWorldQueryResult } from '../../../Worlds/Application/Find/FindWorldQueryHandler';
import { Town } from '../../../Towns/domain/Town';
import { TownId } from '../../../Towns/domain/TownId';

type SelectWorldArgs = {
  userId: UserId;
  worldId: WorldId;
};

type SelectWorldResult = Either<EmptyResult, DomainError>;

export class SelectWorld implements UseCase<SelectWorldArgs, EmptyResult> {
  constructor(
    private playerRepository: PlayerRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus
  ) {}

  async execute(args: SelectWorldArgs): Promise<SelectWorldResult> {
    const player = await this.playerRepository.findByUserId(args.userId);
    if (!player) return failure(new PlayerNotFound(args.userId.toString()));

    const query = new FindWorldQuery({ id: args.worldId.toString() });
    const worldResult: FindWorldQueryResult = await this.queryBus.ask(query);
    if (worldResult.isFailure()) return failure(worldResult.value);
    player.addWorld(worldResult.value);

    const initialTown = Town.create(TownId.createRandom(), { playerId: player.id });
    player.addTown(initialTown);

    await this.playerRepository.save(player);
    await this.eventBus.publish([...initialTown.pullDomainEvents(), ...player.pullDomainEvents()]);
    return success();
  }
}
