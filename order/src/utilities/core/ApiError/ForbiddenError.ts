/**
 * @file This file is responsible for forbidden errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class ForbiddenError extends ApiError {
  constructor(message: string = 'Permission Denied', details?: string) {
    super(ErrorType.FORBIDDEN, message, details);
  }
}
