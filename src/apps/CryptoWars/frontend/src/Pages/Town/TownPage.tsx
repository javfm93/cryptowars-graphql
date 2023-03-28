import TownHeader from './Components/TownHeader';
import { TownBuildings } from './Components/TownBuildings';
import { useTownPagePlayer } from './useTownPagePlayer';

export const TownPage = (): JSX.Element => {
  const { result, error, isLoading } = useTownPagePlayer();
  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <TownHeader />
      <TownBuildings townBuildings={result.towns[0].buildings} />
    </div>
  );
};
