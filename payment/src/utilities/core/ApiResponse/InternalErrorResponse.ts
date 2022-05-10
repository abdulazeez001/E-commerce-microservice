/**
 * @file This file is responsible for internal server error responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class InternalErrorResponse extends ApiResponse {
  constructor(message: string = 'Internal Server Error', details?: string) {
    super(StatusCode.INTERNAL_ERROR, ResponseCode.INTERNAL_SERVER_ERROR, message, details);
  }
}
