import { useWorldMap } from './useWorldMap';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../Shared/Layout';
import { useTownArmy } from '../Headquarter/useTownArmy';
import { useUrlQueryParams } from './useUrlQueryParams';
import { WorldMap } from './WorldMap';
import { WorldAttackMenu } from './WorldAttackMenu';
import { Button } from '@mui/material';
import { useCreateDirectChat } from '../Chat/useCreateDirectChat';
import { AppRoutes } from '../../App';

export const WorldPage = () => {
  const { id } = useParams();
  const townId = useUrlQueryParams('townId');
  if (!id || !townId) return <> Invalid world or town </>;
  const { result, isLoading, error } = useWorldMap(id);
  const armyResult = useTownArmy(townId);
  const { createChat } = useCreateDirectChat();
  const navigate = useNavigate();

  return (
    <Layout
      tittle={'World Map'}
      isLoading={isLoading || armyResult.isLoading}
      error={error || armyResult.error}
    >
      <>
        {result && armyResult.result && (
          <>
            {result.towns.map(town => (
              <Button
                key={town.id}
                onClick={async () => {
                  await createChat(town.playerId);
                  navigate(AppRoutes.chat);
                }}
                disabled={townId === town.id}
              >
                Chat with {town.playerId}
              </Button>
            ))}

            <br />

            <WorldAttackMenu
              attackerTownId={townId}
              army={armyResult.result.army}
              worldTowns={result.towns}
            />
            <WorldMap />
          </>
        )}
      </>
    </Layout>
  );
};
