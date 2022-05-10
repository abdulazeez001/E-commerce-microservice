/**
 * @file This file is responsible for bad request responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class BadRequestResponse extends ApiResponse {
  constructor(message: string = 'Bad Request', details?: string) {
    super(StatusCode.BAD_REQUEST, ResponseCode.FAILURE, message, details);
  }
}
