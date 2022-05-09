/**
 * @file This file defines the User schema which mongoose uses to store and retrieve data from the mongodb User
 * collection. It also creates virtual, methods, statics helper functions and exports it as a model
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { model, Schema, Model } from 'mongoose';
import { OrderStatus } from '../../utilities/enums/enums';
import { IOrder } from 'types';

const OrderSchema: Schema = new Schema({
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  customerId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel: Model<IOrder> = model<IOrder>('Orders', OrderSchema);
export default OrderModel;
