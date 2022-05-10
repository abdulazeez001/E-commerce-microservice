/**
 * @file This file is responsible for authentication failure errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class AuthFailureError extends ApiError {
  constructor(message: string = 'Invalid Credentials', details?: string) {
    super(ErrorType.UNAUTHORIZED, message, details);
  }
}
