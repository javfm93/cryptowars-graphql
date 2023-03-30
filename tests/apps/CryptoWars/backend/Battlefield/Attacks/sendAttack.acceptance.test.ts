import { client } from '../../start';
import { TownEventsGenerator } from '../../../../../Contexts/Battlefield/Armies/domain/TownEventsGenerator';
import { DependencyInjector } from '../../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';
import { EventBus } from '../../../../../../src/Contexts/Shared/Domain/EventBus';
import { SEND_ATTACK } from './sendAttackMutation';
import { UuidGenerator } from '../../../../../Contexts/Shared/Domain/UuidGenerator';
import { login } from '../../IAM/IAMtestHelpers';
import { TestArmy } from '../battlefieldTestHelpers';
import { hasErrors } from '../../testHelpers';

describe('Battlefield - Attacks', () => {
  describe('Given im login', () => {
    beforeEach(async () => {
      await login();
    });

    describe('Given an Army with soldiers and a target army', () => {
      let attackerArmyId: string, defenderTownId: string;

      beforeEach(async () => {
        const attackerArmy = await TestArmy.create();
        const defenderArmy = await TestArmy.create();
        const soldiersTrainFinished = TownEventsGenerator.soldiersTrainFinishedFor(
          { basic: 4, range: 0 },
          attackerArmy.townId
        );
        const eventBus = DependencyInjector.get(EventBus);
        await eventBus.publish([soldiersTrainFinished]);
        attackerArmyId = attackerArmy.id;
        defenderTownId = defenderArmy.townId;
      });

      it('should be able to send an attack', async () => {
        const result = await client.mutate({
          mutation: SEND_ATTACK,
          variables: {
            input: {
              id: UuidGenerator.random().toString(),
              attackerArmy: attackerArmyId,
              defenderTown: defenderTownId,
              soldiers: { basic: 2, range: 0 }
            }
          }
        });

        expect(hasErrors(result.data!.SendAttack)).toBeFalsy();
      });
    });
  });
});
