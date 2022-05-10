/**
 * @file This file is responsible for forbidden responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class ForbiddenResponse extends ApiResponse {
  constructor(message: string = 'Permission Denied', details?: string) {
    super(StatusCode.FORBIDDEN, ResponseCode.FAILURE, message, details);
  }
}
