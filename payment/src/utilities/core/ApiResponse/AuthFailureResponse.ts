/**
 * @file This file is responsible for authentication failure responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class AuthFailureResponse extends ApiResponse {
  constructor(message: string = 'Invalid Credentials', details?: string) {
    super(StatusCode.UNAUTHORIZED, ResponseCode.FAILURE, message, details);
  }
}
