import * as React from 'react';
import { usePlayer } from './usePlayer';
import TownHeader from './TownHeader';
import { TownBuildings } from './TownBuildings';

export const TownPage = (): JSX.Element => {
  const { result } = usePlayer();
  if (!result) return <p>Not player found</p>;
  return (
    <div>
      <TownHeader />
      <TownBuildings buildings={result.player.towns[0].buildings} />
    </div>
  );
};
