/**
 * @file Handles request for login, signup, otpSetup, otpVerification, passwordRecovery, passwordReset
 * @@author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Request, Response, NextFunction, Router } from 'express';
import { IUser, Login, LoginResponse } from 'types';
import asyncHandler from '../../utilities/core/asyncHandler';
import Authentication from '../../utilities/validators/schemas/Authentication';
import Validator from '../../utilities/validators';
import SuccessResponse from '../../utilities/core/ApiResponse/SuccessResponse';
import AuthenticationService from '../../services/AuthenticationService';
import JsonWebToken from '../../utilities/core/JsonWebToken';
import { request } from 'http';

const router: Router = express.Router();

export default (): Router => {
  router.post(
    '/login',
    Validator(Authentication.loginSchema()),
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.body as Login;
      const result = await new AuthenticationService().login(data);
      return new SuccessResponse<LoginResponse>('Login was Successful', result).send(res);
    })
  );

  router.post(
    '/signup',
    Validator(Authentication.signupSchema()),
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.body as IUser;
      await new AuthenticationService().signup(data);
      return new SuccessResponse('Registration was Successful').send(res);
    })
  );

  return router;
};
