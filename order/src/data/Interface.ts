/**
 * @file This file defines interfaces implemented by the repository classes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { IOrder } from 'types';

export interface IOrderRepository {
  createOrder(Order: IOrder): Promise<IOrder>;
  findOrders(): Promise<IOrder[]>;
  findOrderById(OrderId: mongoose.Types.ObjectId): Promise<IOrder | null>;
  deleteOrder(OrderId: mongoose.Types.ObjectId): Promise<IOrder | null>;
}
