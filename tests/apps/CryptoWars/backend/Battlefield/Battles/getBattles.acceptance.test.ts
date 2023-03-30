import { client } from '../../start';
import { GET_BATTLES } from './getBattlesQuery';
import { login } from '../../IAM/IAMtestHelpers';
import { TestArmy } from '../battlefieldTestHelpers';

describe('Battlefield - Battles - GetBattles', () => {
  describe('Given im login', () => {
    beforeEach(async () => {
      await login();
    });

    describe('Given an army that have sent an attack', () => {
      let armyId: string;

      beforeEach(async () => {
        const attacker = await TestArmy.create();
        await attacker.trainSoldiers({ basic: 4, range: 0 });
        await attacker.sendAttackTo(await TestArmy.create()).with({ basic: 4, range: 0 });
        armyId = attacker.id;
      });

      it('should get the battles history', async () => {
        const result = await client.query({
          query: GET_BATTLES,
          variables: { armyId }
        });

        const battles = result.data.GetBattles.battles;
        expect(battles).toHaveLength(1);
      });
    });
  });
});
