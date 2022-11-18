import { useTranslation } from 'react-i18next';
import { useTrainSoldiers } from './useTrainSoldiers';
import { useParams } from 'react-router-dom';
import { useTownArmy } from './useTownArmy';
import { usePlayer } from '../Town/usePlayer';
import TownHeader from '../Town/TownHeader';
import { useBattles } from '../Town/useBattles';
import { BattleHistory } from './BattleHistory';
import { TrainSoldiers } from './TrainSoldiers';

export const HeadquarterPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams();
  if (!id) return <p> Not Valid Town Id</p>;
  const { trainSoldiers } = useTrainSoldiers(id);
  const { result } = useTownArmy(id);
  const { result: playerResult } = usePlayer();
  const { result: battlesResult } = useBattles(result?.army.id);
  if (!result || !result.army || !playerResult || !playerResult.player)
    return <p> Loading Your Army...</p>;
  if (!battlesResult) return <p> Error Loading battle results</p>;

  const town = playerResult.player.towns.find(to => to.id === id);
  if (!town) return <p> Not Valid Town Id</p>;

  return (
    <div>
      <TownHeader />
      <TrainSoldiers
        townUnits={town.buildings.headquarter.units}
        townArmySquads={result.army.squads}
        onTrainSoldiers={trainSoldiers}
      />
      <BattleHistory battles={battlesResult.battles} />
    </div>
  );
};
