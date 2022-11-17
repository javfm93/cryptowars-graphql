import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWorlds } from './useWorlds';
import { useJoinWorld } from './useJoinWorld';
import { Layout } from '../Shared/Layout';
import { Worlds } from './Worlds';

export const SelectWorld: FC = () => {
  const { t } = useTranslation();
  const { isLoading, error, result } = useWorlds();
  const { joinWorld } = useJoinWorld();

  return (
    <Layout tittle={t('home.startPlaying')} isLoading={isLoading} error={error}>
      {result ? <Worlds worlds={result.worlds} onWorldSelected={joinWorld} /> : <></>}
    </Layout>
  );
};
