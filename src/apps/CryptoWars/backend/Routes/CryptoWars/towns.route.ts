import { Router } from 'express';
import { requireAuth } from '../../Auth';
import { TrainSoldiersPostController } from '../../Controllers/CryptoWars/Towns/TrainSoldiersPostController';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const trainSoldiersPostController = DependencyInjector.get(TrainSoldiersPostController);
  router.post(
    '/towns/:id/train-soldiers',
    requireAuth,
    trainSoldiersPostController.run.bind(trainSoldiersPostController)
  );
};
