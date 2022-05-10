/**
 * @file A type declaration for application types
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import debug from 'debug';
import { Document } from 'mongoose';
import { ResponseCode, OrderStatus } from '../enums/enums';

export type Config = {
  applicationName: string;
  port: string;
  mongodb: {
    dsn: string;
    options: {
      dbName: string;
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
    };
  };
  debugger: debug.Debugger;
};

export type Payload<R> = {
  responseCode: ResponseCode;
  message: string;
  details?: string;
  url: string;
  data: R;
};

export type CustomerResponse = {
  customerId: string;
  orderId: string;
  productId: string;
  orderStatus: string;
};

export type toPaymentService = {
  customerId: string;
  orderId: string;
  productId: string;
  amount: number;
};

export interface IOrder extends Document {
  status: OrderStatus;
  customerId: string;
  productId: string;
  price: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword(password: string): boolean;
  createToken(): string;
}

export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

export type JwtClaims = {
  reserved: {
    algorithm: Algorithm;
    issuer: string;
    audience: string;
    expiresIn: string;
    subject: string;
  };
  application: {
    name: string;
    email: string;
  };
};

export type JwtPayload = {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  prm?: string;
  name: string;
  email: string;
};
