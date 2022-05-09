/**
 * @file This file is responsible for not found responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class NotFoundResponse extends ApiResponse {
  constructor(message: string = 'Not Found', details?: string) {
    super(StatusCode.NOT_FOUND, ResponseCode.FAILURE, message, details);
  }
}
