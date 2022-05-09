/**
 * @file Contains Application Enumerations. Enums allow a developer to define a set of named constants.
 * @see {@link https://www.typescriptlang.org/docs/handbook/enums.html}
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

export enum ResponseCode {
  SUCCESS = '1000',
  FAILURE = '1001',
  RETRY = '1002',
  INVALID_ACCESS_TOKEN = '1003',
  EXPIRED_ACCESS_TOKEN = '1004',
  INTERNAL_SERVER_ERROR = '1005',
}

export enum StatusCode {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  FOUND = 302,
  NOT_MODIFIED = 304,
  TEMP_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_ERROR = 500,
}

export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export enum RequestSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}
