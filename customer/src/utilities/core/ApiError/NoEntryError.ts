/**
 * @file This file is responsible for no entry errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class NoEntryError extends ApiError {
  constructor(message: string = 'No Entry', details?: string) {
    super(ErrorType.NO_ENTRY, message, details);
  }
}
