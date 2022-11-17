import { FC } from 'react';
import { Button } from '@mui/material';
import { WorldPrimitives } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/World';

interface WorldsProps {
  worlds: Array<WorldPrimitives>;

  onWorldSelected(world: WorldPrimitives): () => void;
}

export const Worlds: FC<WorldsProps> = ({ worlds, onWorldSelected }) => (
  <>
    {worlds.map(world => (
      <Button onClick={onWorldSelected(world)} key={world.id}>
        {world.name}
      </Button>
    ))}
  </>
);
