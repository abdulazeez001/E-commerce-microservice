/**
 * @file Handles related Order activities
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import OrderRepository from '../data/repository/OrderRepository';
import Broker from './Broker';
import { CustomerResponse, IOrder } from 'types';
import stringify from 'safe-json-stringify';

export default class OrderService extends OrderRepository {
  constructor() {
    super();
  }

  public async makeOrder(data: IOrder): Promise<CustomerResponse> {
    const result = await this.createOrder(data);
    const customerResponse: CustomerResponse = {
      customerId: result.customerId,
      orderId: result.id,
      productId: result.productId,
      orderStatus: result.status,
    };
    const toPaymentService = {
      customerId: result.customerId,
      orderId: result.id,
      productId: result.productId,
      amount: result.price,
    };
    Broker.sendToQueue('PAYMENT', stringify(toPaymentService));
    return customerResponse;
  }
}
