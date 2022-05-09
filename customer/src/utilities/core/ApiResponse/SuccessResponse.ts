/**
 * @file This file is responsible for success responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { Response } from 'express';
import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class SuccessResponse<R> extends ApiResponse {
  private readonly data?: R;

  constructor(message: string, data?: R) {
    super(StatusCode.SUCCESS, ResponseCode.SUCCESS, message);
    this.data = data;
  }

  public send(res: Response): Response {
    return super.prepare<R>(res, this.data);
  }
}
