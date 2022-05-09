/**
 * @file Manages all database queries related to the Customer document(table)
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { IOrder } from 'types';
import { IOrderRepository } from '../Interface';
import OrderModel from '../models/Order';

export default class OrderRepository implements IOrderRepository {
  public async createOrder(Order: IOrder): Promise<IOrder> {
    return OrderModel.create<IOrder>(Order);
  }

  public async findOrderById(OrderId: mongoose.Types.ObjectId): Promise<IOrder | null> {
    return OrderModel.findById(OrderId);
  }

  public async findOrders(): Promise<IOrder[]> {
    return OrderModel.find({});
  }

  public async deleteOrder(OrderId: mongoose.Types.ObjectId): Promise<IOrder | null> {
    return OrderModel.findOneAndDelete({ _id: OrderId });
  }
}
