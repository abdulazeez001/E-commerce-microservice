/**
 * @file Creates and Verifies Json Web Tokens
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Algorithm, IUser, JwtClaims, JwtPayload } from 'types';
import { Request, Response, NextFunction } from 'express';
import AccessTokenError from './ApiError/AccessTokenError';
import BadRequestError from './ApiError/BadRequestError';
import BadTokenError from './ApiError/BadTokenError';
import ForbiddenError from './ApiError/ForbiddenError';
import ExpiredTokenError from './ApiError/ExpiredTokenError';

const ALGORITHM = 'HS256';
const ISSUER = 'shittu';
const AUDIENCE = ['User'];

export default class JsonWebToken {
  private readonly expiresIn: string;
  private payload: IUser;
  private algorithm: Algorithm = ALGORITHM;
  private secret = process.env.JWT_SECRET_KEY as string;
  private issuer = ISSUER;

  constructor(payload: IUser, expire = '1hr') {
    this.expiresIn = expire;
    this.payload = payload;
  }

  /**
   * @description generates jwt token by signing app and reserved claims and jwt secret
   * @return {String} - token
   */
  public create(): string {
    return jwt.sign(this.getClaims().application, this.secret, this.getClaims().reserved);
  }

  /**
   * @description generates application and reserved claims
   * @return {JwtClaims} - claims
   */
  private getClaims(): JwtClaims {
    return {
      reserved: {
        algorithm: this.algorithm,
        issuer: this.issuer,
        audience: 'User',
        expiresIn: this.expiresIn,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        subject: this.payload._id.toString() as string,
      },
      application: {
        name: `${this.payload.firstName} ${this.payload.lastName}`,
        email: this.payload.email,
      },
    };
  }

  /**
   * @description get jwt token from authorization headers
   * @param req - current express request to the server
   * @return {string|null} - returns token or null if nothing found
   */
  public static getToken(req: Request): string | null {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }

  /**
   * @description claims to be validated when token is being verified
   * @return {{audience: [string, string], issuer: string, algorithm: string}}
   */
  private static validateClaims(): { algorithm: Algorithm; issuer: string; audience: string[] } {
    return {
      algorithm: ALGORITHM,
      issuer: ISSUER,
      audience: AUDIENCE,
    };
  }

  /**
   * @description checks if token provided is valid, if yes set user property in request object
   * @return {Promise<void>}
   */
  public static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = JsonWebToken.getToken(req);

    if (token) {
      try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const decoded = (await jwt.verify(
          token,
          process.env.JWT_SECRET_KEY as string,
          JsonWebToken.validateClaims()
        )) as JwtPayload;

        res.locals.user = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          audience: decoded.aud,
        };
        next();
      } catch (e) {
        if (e instanceof TokenExpiredError && e.name === 'TokenExpiredError') next(new ExpiredTokenError());
        else if (e instanceof JsonWebTokenError && e.message === 'jwt malformed') next(new BadTokenError());
        else next(new AccessTokenError());
      }
    } else {
      next(new BadRequestError('No Token Provided', "Please send an Authorization Header with value - Bearer 'Token'"));
    }
  }

  public static async verifyEmailToken(
    token: string
  ): Promise<{ id: string; name: string; email: string; audience: string }> {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const decoded = (await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string,
        JsonWebToken.validateClaims()
      )) as JwtPayload;
      return {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        audience: decoded.aud,
      };
    } catch (e) {
      throw new ForbiddenError('Invalid Token');
    }
  }
}
