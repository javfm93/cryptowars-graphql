import { client } from '../../start';
import { GET_ARMY } from './getArmyQuery';
import { TownEventsGenerator } from '../../../../../Contexts/Battlefield/Armies/domain/TownEventsGenerator';
import { DependencyInjector } from '../../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';
import { EventBus } from '../../../../../../src/Contexts/Shared/Domain/EventBus';
import { TownCreatedDomainEvent } from '../../../../../../src/Contexts/CryptoWars/Towns/Domain/TownCreatedDomainEvent';
import { Player } from '../../__generated__/graphql';
import { login } from '../../IAM/IAMtestHelpers';
import { getPlayer } from '../../CryptoWars/cryptoWarsTestHelpers';

describe('Battlefield - Armies - GetArmy', () => {
  describe('Given im login', () => {
    let player: Player;

    beforeEach(async () => {
      await login();
      player = await getPlayer();
    });

    describe('Given a Town Created Event is sent ', () => {
      let event: TownCreatedDomainEvent;

      beforeEach(async () => {
        event = TownEventsGenerator.CreatedBy(player.id);
        const eventBus = DependencyInjector.get(EventBus);
        await eventBus.publish([event]);
      });

      it('should get the army information', async () => {
        const result = await client.query({
          query: GET_ARMY,
          variables: { townId: event.aggregateId }
        });

        const army = result.data.GetArmy;
        expect(army.playerId).toBe(player.id);
        expect(army.squads.basic).toBe(0);
        expect(army.squads.range).toBe(0);
      });
    });
  });
});
