/**
 * @file Organises all application route and exports the Express Router as module
 * @see {@link https://expressjs.com/en/guide/routing.html#expressRouter}
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Router } from 'express';
import JsonWebToken from '../utilities/core/JsonWebToken';
import healthRoute from './health';
import orderRoute from './order';

const router: Router = express.Router();
const jwt = JsonWebToken.verifyToken;

export default (): Router => {
  /**
   *  ATTENTION:
   *  please place unprotected routes first as there is a fall-through when the jwt protection is
   *  placed on any route
   */

  router.use('/', healthRoute());
  router.use(jwt);
  router.use('/', orderRoute());

  return router;
};
