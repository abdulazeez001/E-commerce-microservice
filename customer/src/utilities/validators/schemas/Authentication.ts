/**
 * @file This file defines the validation schema for authentication routes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import Joi from 'joi';

export default class Authentication {
  public static loginSchema(): Joi.ObjectSchema {
    return Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          '- Minimum eight characters, at least one letter, one number and one special character -'
        )
        .min(8)
        .required()
        .strict(),
    }).unknown(false);
  }

  public static signupSchema(): Joi.ObjectSchema {
    return Joi.object({
      firstName: Joi.string()
        .regex(/^[A-Za-z]+$/, '- only as letters -')
        .lowercase()
        .trim()
        .required(),
      lastName: Joi.string()
        .regex(/^[A-Za-z]+$/, '- only as letters -')
        .lowercase()
        .trim()
        .required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          '- Minimum eight characters, at least one letter, one number and one special character -'
        )
        .min(8)
        .required()
        .strict(),
    }).unknown(false);
  }
}
