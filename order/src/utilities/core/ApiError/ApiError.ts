/**
 * @file This file is contains an abstract base class for all API errors.
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { Response } from 'express';
import { ErrorType } from '../../enums/enums';
import AccessTokenResponse from '../ApiResponse/AccessTokenResponse';
import AuthFailureResponse from '../ApiResponse/AuthFailureResponse';
import BadRequestResponse from '../ApiResponse/BadRequestResponse';
import ExpiredTokenResponse from '../ApiResponse/ExpiredTokenResponse';
import ForbiddenResponse from '../ApiResponse/ForbiddenResponse';
import InternalErrorResponse from '../ApiResponse/InternalErrorResponse';
import NotFoundResponse from '../ApiResponse/NotFoundResponse';
import HttpException from '../HttpException';

export default abstract class ApiError extends HttpException {
  public type: ErrorType;
  public message: string;
  public details?: string;

  constructor(type: ErrorType, message: string = 'Error', details?: string) {
    super(0, message);
    this.type = type;
    this.message = message;
    this.details = details;
  }

  public static handle(error: ApiError, res: Response): Response {
    switch (error.type) {
      case ErrorType.TOKEN_EXPIRED:
        return new ExpiredTokenResponse(error.message).send(res);
      case ErrorType.BAD_TOKEN:
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenResponse(error.message).send(res);
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(error.message).send(res);
      case ErrorType.INTERNAL:
        return ApiError.hideDetails(error, res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(error.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(error.message, error.details).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(error.message).send(res);
      default:
        return ApiError.hideDetails(error, res);
    }
  }

  public static hideDetails(error: ApiError, res: Response): Response {
    let { message } = error;
    // Do not send failure message in production as it may send sensitive data
    if (process.env.NODE_ENV === 'production') message = 'Something wrong happened.';
    return new InternalErrorResponse(message).send(res);
  }
}
