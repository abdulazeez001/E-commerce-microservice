/**
 * @file Defines the basic configuration of the Express Framework @see {@link https://expressjs.com/} and Mongoose
 * ORM @see {@link https://mongoosejs.com} connection to MONGODB database. Then it exports the config as module.
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { Config } from 'types';
import HttpException from './utilities/core/HttpException';
import routeHandler from './routes';
import NotFoundError from './utilities/core/ApiError/NotFoundError';
import BadRequestError from './utilities/core/ApiError/BadRequestError';
import ApiError from './utilities/core/ApiError/ApiError';
import InternalError from './utilities/core/ApiError/InternalError';
import seed from './seed';

export default (config: Config): Application => {
  const app: Application = express();

  app.use(helmet());

  // initialize mongodb connection with mongoose
  // TODO: use the logger instead of the debugger

  mongoose
    .connect(config.mongodb.dsn, config.mongodb.options)
    .then(() => {
      console.log('Successfully connected to the Products Db');
      seed();
    })
    .catch((err) => console.log('Could not connect to MongoDb', err));

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      throw new BadRequestError('Bad Request', 'Invalid Json');
    }

    next();
  });

  app.use('/', routeHandler());

  // catch 404 and forward to error handler
  app.use(function (req: Request, res: Response, next: NextFunction) {
    next(new NotFoundError('Resource Not Found'));
  });

  // Error Handler
  app.use(function (error: HttpException, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiError) {
      // TODO: Log Errors
      ApiError.handle(error, res);
    } else {
      ApiError.handle(new InternalError(error.message), res);
    }
  });

  return app;
};
