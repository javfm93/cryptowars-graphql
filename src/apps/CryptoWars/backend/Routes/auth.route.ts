import { Router } from 'express';
import httpStatus from 'http-status';
import { localAuthentication } from '../Auth/localStrategy';

export const register = (router: Router) => {
  router.post('/login', localAuthentication, function (req, res) {
    res.status(httpStatus.OK).send();
  });
};
