/**
 * @file This file defines the validation schema for authentication routes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import Joi from 'joi';

let Reqstr = Joi.string().lowercase().trim().required();
export default class Product {
  public static createProductSchema(): Joi.ObjectSchema {
    return Joi.object({
      name: Reqstr,
      description: Reqstr,
      price: Joi.number().required(),
    }).unknown(false);
  }

  public static orderProductSchema(): Joi.ObjectSchema {
    return Joi.object({
      customerId: Reqstr,
      productId: Reqstr,
      name: Reqstr,
      description: Reqstr,
      price: Joi.number().required(),
    }).unknown(false);
  }
}
