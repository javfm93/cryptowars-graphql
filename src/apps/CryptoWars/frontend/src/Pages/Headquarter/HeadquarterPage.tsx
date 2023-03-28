import { useTrainSoldiers } from './useTrainSoldiers';
import { useParams } from 'react-router-dom';
import { useTownArmy } from './useTownArmy';
import TownHeader from '../Town/Components/TownHeader';
import { useBattles } from '../Town/useBattles';
import { BattleHistory } from './BattleHistory';
import { TrainSoldiers } from './TrainSoldiers';
import { usePlayerTownHeadquarter } from './usePlayerTownHeadQuarter';

export const HeadquarterPage = (): JSX.Element => {
  const { id } = useParams();
  if (!id) return <p> Not Valid Town Id</p>;

  const { execute } = useTrainSoldiers(id);
  const { result } = useTownArmy(id);
  const { result: headquarter } = usePlayerTownHeadquarter(id);
  const { result: battlesResult } = useBattles(result?.army.id);

  if (!result || !result.army || !headquarter) return <p> Loading Your Army...</p>;
  if (!battlesResult) return <p> Error Loading battle results</p>;

  return (
    <div>
      <TownHeader />
      <TrainSoldiers
        townUnits={headquarter.units}
        townArmySquads={result.army.squads}
        onTrainSoldiers={execute}
      />
      <BattleHistory battles={battlesResult.battles} />
    </div>
  );
};
