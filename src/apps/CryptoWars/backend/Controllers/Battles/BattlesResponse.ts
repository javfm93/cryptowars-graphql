import { Primitives } from '../../../../../Contexts/Shared/Domain/Primitives';
import { Battle } from '../../../../../Contexts/Battlefield/Battles/Domain/Battle';

export type BattlesResponse = {
  battles: Array<Primitives<Battle>>;
};
