/**
 * @file Handles a GET request to test if application is still running
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Request, Response, Router } from 'express';
import asyncHandler from '../../utilities/core/asyncHandler';
import SuccessResponse from '../../utilities/core/ApiResponse/SuccessResponse';

const router: Router = express.Router();

export default (): Router => {
  router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
      return new SuccessResponse('Successful', { status: 'working' }).send(res);
    })
  );

  return router;
};
