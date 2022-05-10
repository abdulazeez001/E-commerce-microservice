/**
 * @file This file is responsible for expired token responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { Response } from 'express';
import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class ExpiredTokenResponse extends ApiResponse {
  private readonly instruction: string;

  constructor(message: string = 'Expired Token', details: string = 'Please Check Instruction Header') {
    super(StatusCode.UNAUTHORIZED, ResponseCode.EXPIRED_ACCESS_TOKEN, message, details);
    this.instruction = 'Refresh Token';
  }

  public send(res: Response): Response {
    res.setHeader('Instruction', this.instruction);
    return super.prepare(res);
  }
}
