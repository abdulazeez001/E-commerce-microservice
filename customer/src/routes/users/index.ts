/**
 * @file Defines the User routes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Request, Response, Router } from 'express';
import { IUser } from 'types';
import asyncHandler from '../../utilities/core/asyncHandler';
import SuccessResponse from '../../utilities/core/ApiResponse/SuccessResponse';
import UserService from '../../services/UserService';
const router: Router = express.Router();

export default (): Router => {
  router.get(
    '/users',
    asyncHandler(async (req: Request, res: Response) => {
      console.log(res.locals.user);
      const result: IUser[] = await new UserService().findUsers();
      return new SuccessResponse<IUser[]>('Successful', result).send(res);
    })
  );

  return router;
};
