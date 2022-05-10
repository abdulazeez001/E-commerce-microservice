/**
 * @file Defines the User routes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Request, Response, Router } from 'express';
import { CustomerResponse, IOrder } from 'types';
import asyncHandler from '../../utilities/core/asyncHandler';
import SuccessResponse from '../../utilities/core/ApiResponse/SuccessResponse';
import OrderService from '../../services/OrderService';
import mongoose from 'mongoose';
import { OrderStatus } from '../../utilities/enums/enums';

const router: Router = express.Router();

export default (): Router => {
  router.get(
    '/orders',
    asyncHandler(async (req: Request, res: Response) => {
      const result: IOrder[] = await new OrderService().findOrders();
      return new SuccessResponse<IOrder[]>('Successful', result).send(res);
    })
  );

  router.post(
    '/orders',
    asyncHandler(async (req: Request, res: Response) => {
      const { customerId, product } = req.body;
      const data = {
        status: OrderStatus.CREATED,
        customerId,
        productId: product._id,
        price: product.price,
      } as IOrder;
      const customerResponse = await new OrderService().makeOrder(data);
      return new SuccessResponse<CustomerResponse>('Successful', customerResponse).send(res);
    })
  );

  router.get(
    '/orders/:orderId',
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.params.orderId as unknown as mongoose.Types.ObjectId;
      const result: IOrder | null = await new OrderService().findOrderById(data);
      return new SuccessResponse<IOrder | null>('Successful', result).send(res);
    })
  );

  router.delete(
    '/orders/:orderId',
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.params.orderId as unknown as mongoose.Types.ObjectId;
      const result: IOrder | null = await new OrderService().deleteOrder(data);
      return new SuccessResponse<IOrder | null>('Successful', result).send(res);
    })
  );

  return router;
};
