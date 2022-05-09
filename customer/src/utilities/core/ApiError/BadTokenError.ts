/**
 * @file This file is responsible for bad malformed token errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class BadTokenError extends ApiError {
  constructor(message: string = 'Token Is Invalid', details?: string) {
    super(ErrorType.BAD_TOKEN, message, details);
  }
}
