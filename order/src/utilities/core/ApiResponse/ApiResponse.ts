/**
 * @file This file is contains an abstract base class for all API responses, ensures uniformity in all API responses
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { Response } from 'express';
import { Payload } from 'types';
import { StatusCode, ResponseCode } from '../../enums/enums';

export default abstract class ApiResponse {
  protected statusCode: StatusCode;
  protected responseCode: ResponseCode;
  protected message: string;
  protected details?: string;
  protected url: string;

  protected contentType: string;
  protected poweredBy: string;

  protected constructor(statusCode: StatusCode, responseCode: ResponseCode, message: string, details?: string) {
    this.statusCode = statusCode;
    this.responseCode = responseCode;
    this.message = message;
    this.details = details;
    this.url = '';
    this.contentType = 'application/json';
    this.poweredBy = 'Maxsio Inc';
  }

  private setHeaders(res: Response): void {
    res.set('X-Powered-By', this.poweredBy);
    res.set('Content-Type', this.contentType);
  }

  private payload<V>(data: V): Payload<V> {
    return {
      responseCode: this.responseCode,
      message: this.message,
      details: this.details,
      url: this.url,
      data,
    };
  }

  protected prepare<R>(res: Response, data?: R): Response {
    this.setHeaders(res);
    const slashes = '://';
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.url = res?.req?.protocol + slashes + res?.req?.get('host') + res?.req?.originalUrl;
    return res.status(this.statusCode).json(this.payload(data));
  }

  public send(res: Response): Response {
    return this.prepare(res);
  }
}
