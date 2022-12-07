import { usePlayer } from '../Town/usePlayer';
import { Towns } from './Towns';

export const Home = (): JSX.Element => {
  const { result, isLoading } = usePlayer();

  if (isLoading) {
    return <></>;
  }
  if (!isLoading && !result) {
    return <>An error happen</>;
  }

  return <Towns towns={result.player.towns} />;
};
