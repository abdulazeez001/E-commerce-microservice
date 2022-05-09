/**
 * @file This file is responsible for access token responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>m>
 */

import { Response } from 'express';
import ApiResponse from './ApiResponse';
import { ResponseCode, StatusCode } from '../../enums/enums';

export default class AccessTokenResponse extends ApiResponse {
  private readonly instruction: string;

  constructor(message: string = 'Invalid Access Token', details: string = 'Please Check Instruction Header') {
    super(StatusCode.UNAUTHORIZED, ResponseCode.INVALID_ACCESS_TOKEN, message, details);
    this.instruction = 'Get a valid Token';
  }

  public send(res: Response): Response {
    res.setHeader('Instruction', this.instruction);
    return super.prepare(res);
  }
}
