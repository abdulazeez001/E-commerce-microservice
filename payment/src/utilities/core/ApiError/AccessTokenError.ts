/**
 * @file This file is responsible for access token errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class AccessTokenError extends ApiError {
  constructor(message: string = 'Invalid Access Token', details?: string) {
    super(ErrorType.ACCESS_TOKEN, message, details);
  }
}
