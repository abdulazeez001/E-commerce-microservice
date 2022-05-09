/**
 * @file This file performs the actual validation, it serves as the middleware which intercepts every request
 * to our API endpoints and validate the request data before handling control over to the route handler
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { RequestSource } from '../enums/enums';
import BadRequestError from '../core/ApiError/BadRequestError';

export default (schema: Joi.ObjectSchema, source: RequestSource = RequestSource.BODY) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source], { abortEarly: false });

      if (!error) return next();

      const { details } = error;
      const messageDetails = details.map((i) => i.message.replace(/['"]+/g, '')).join(', ');
      // TODO: Log Error

      return next(new BadRequestError('Invalid Credentials', messageDetails));
    } catch (error) {
      return next(error);
    }
  };
