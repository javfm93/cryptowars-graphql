import { Player } from '../../../../../../Contexts/CryptoWars/Players/Domain/Player';
import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';

export type PlayerResponse = {
  player: Primitives<Player>;
};
