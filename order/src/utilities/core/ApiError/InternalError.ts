/**
 * @file This file is responsible for internal server errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class InternalError extends ApiError {
  constructor(message: string = 'Internal Server Error', details?: string) {
    super(ErrorType.INTERNAL, message, details);
  }
}
