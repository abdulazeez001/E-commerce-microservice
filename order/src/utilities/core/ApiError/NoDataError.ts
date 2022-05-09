/**
 * @file This file is responsible for no data errors
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiError from './ApiError';
import { ErrorType } from '../../enums/enums';

export default class NoDataError extends ApiError {
  constructor(message: string = 'No Data', details?: string) {
    super(ErrorType.NO_DATA, message, details);
  }
}
