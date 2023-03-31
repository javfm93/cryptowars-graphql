import { Towns } from './Towns';
import { useHomePagePlayer } from './useHomePagePlayer';

export const HomePage = (): JSX.Element => {
  const { result, isLoading } = useHomePagePlayer();

  if (isLoading) {
    return <></>;
  }
  if (!isLoading && !result) {
    return <>An error happen</>;
  }

  return <Towns towns={result.towns} />;
};
