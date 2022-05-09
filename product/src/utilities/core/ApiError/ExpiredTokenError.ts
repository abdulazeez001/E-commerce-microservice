/**
 * @file This file is responsible for expired token errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class ExpiredTokenError extends ApiError {
  constructor(message: string = 'Expired Token', details?: string) {
    super(ErrorType.TOKEN_EXPIRED, message, details);
  }
}
