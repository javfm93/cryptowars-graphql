import { Army } from '../../../../../Contexts/Battlefield/Armies/Domain/Army';
import { Primitives } from '../../../../../Contexts/Shared/Domain/Primitives';

export type ArmyResponse = {
  army: Primitives<Army>;
};
