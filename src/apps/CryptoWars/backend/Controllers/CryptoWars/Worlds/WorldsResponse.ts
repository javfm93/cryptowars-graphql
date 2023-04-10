import { Worlds } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/Worlds';
import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';

export type WorldsResponse = {
  worlds: Primitives<Worlds>;
};
