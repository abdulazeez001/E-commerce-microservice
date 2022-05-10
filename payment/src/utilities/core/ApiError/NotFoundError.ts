/**
 * @file This file is responsible for not found errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class NotFoundError extends ApiError {
  constructor(message: string = 'Not Found', details?: string) {
    super(ErrorType.NOT_FOUND, message, details);
  }
}
