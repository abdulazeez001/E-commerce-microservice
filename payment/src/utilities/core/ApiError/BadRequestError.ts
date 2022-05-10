/**
 * @file This file is responsible for bad request errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request', details?: string) {
    super(ErrorType.BAD_REQUEST, message, details);
  }
}
