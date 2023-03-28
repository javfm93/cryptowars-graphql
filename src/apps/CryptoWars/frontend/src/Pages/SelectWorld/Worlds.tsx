import { FC } from 'react';
import { Button } from '@mui/material';
import {
  FragmentType,
  gql,
  useFragment
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';

type WorldsProps = {
  worlds: Array<FragmentType<typeof selectWorldsFragment>>;
  onWorldSelected(worldId: string): Promise<void>;
};

export const Worlds: FC<WorldsProps> = props => {
  const worlds = useFragment(selectWorldsFragment, props.worlds);

  return (
    <>
      {worlds.map(world => (
        <Button onClick={() => props.onWorldSelected(world.id)} key={world.id}>
          {world.name}
        </Button>
      ))}
    </>
  );
};

const selectWorldsFragment = gql(/* GraphQL */ `
  fragment WorldSelection on World {
    id
    name
  }
`);
