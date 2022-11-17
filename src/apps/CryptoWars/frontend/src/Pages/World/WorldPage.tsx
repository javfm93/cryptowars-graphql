import { useWorld } from './useWorld';
import { useParams } from 'react-router-dom';
import { Layout } from '../Shared/Layout';
import { useTownArmy } from '../Headquarter/useTownArmy';
import { useUrlQueryParams } from './useUrlQueryParams';
import { WorldMap } from './WorldMap';
import { WorldAttackMenu } from './WorldAttackMenu';

export const WorldPage = () => {
  const { id } = useParams();
  const townId = useUrlQueryParams('townId');
  if (!id || !townId) return <> Invalid world or town </>;
  const { result, isLoading, error } = useWorld(id);
  const armyResult = useTownArmy(townId);

  // todo: test, when a world was already selected, not create another town
  return (
    <Layout
      tittle={'World Map'}
      isLoading={isLoading || armyResult.isLoading}
      error={error || armyResult.error}
    >
      {result && armyResult.result && (
        <>
          <WorldAttackMenu
            attackerTownId={townId}
            army={armyResult.result.army}
            worldTowns={result.world.towns}
          />
          <WorldMap />
        </>
      )}
    </Layout>
  );
};
