import { TownEventsGenerator } from '../../../../Contexts/Battlefield/Armies/domain/TownEventsGenerator';
import { DependencyInjector } from '../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';
import { EventBus } from '../../../../../src/Contexts/Shared/Domain/EventBus';
import { getPlayer } from '../CryptoWars/cryptoWarsTestHelpers';
import { client } from '../start';
import { GET_ARMY } from './Armies/getArmyQuery';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { SEND_ATTACK } from './Attacks/sendAttackMutation';
import { UuidGenerator } from '../../../../Contexts/Shared/Domain/UuidGenerator';
import { SquadsPrimitives } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';

export class TestArmy {
  private constructor(readonly id: string, readonly townId: string) {}

  static async create() {
    const player = await getPlayer();
    const townCreated = TownEventsGenerator.CreatedBy(player.id);
    const eventBus = DependencyInjector.get(EventBus);
    await eventBus.publish([townCreated]);
    const townId = townCreated.aggregateId;
    const army = await client.query({
      query: GET_ARMY,
      variables: { townId }
    });
    return new TestArmy(army.data.GetArmy.id, townId);
  }

  async trainSoldiers(soldiers: TownSoldiersPrimitives) {
    const soldiersTrainFinished = TownEventsGenerator.soldiersTrainFinishedFor(
      soldiers,
      this.townId
    );
    const eventBus = DependencyInjector.get(EventBus);
    await eventBus.publish([soldiersTrainFinished]);
  }

  sendAttackTo(army: TestArmy) {
    return {
      with: async (squads: SquadsPrimitives) => {
        await client.mutate({
          mutation: SEND_ATTACK,
          variables: {
            input: {
              id: UuidGenerator.random().toString(),
              attackerArmy: this.id,
              defenderTown: army.townId,
              soldiers: squads
            }
          }
        });
      }
    };
  }
}

export const createArmy = async () => {
  const player = await getPlayer();
  const townCreated = TownEventsGenerator.CreatedBy(player.id);
  const eventBus = DependencyInjector.get(EventBus);
  await eventBus.publish([townCreated]);
  const townId = townCreated.aggregateId;
  const army = await client.query({
    query: GET_ARMY,
    variables: { townId }
  });
  return { townId, id: army.data.GetArmy.id };
};
