/**
 * @file Defines the User routes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Request, Response, Router } from 'express';
import { ITransaction } from 'types';
import asyncHandler from '../../utilities/core/asyncHandler';
import SuccessResponse from '../../utilities/core/ApiResponse/SuccessResponse';
import PaymentService from '../../services/PaymentService';
import mongoose from 'mongoose';

const router: Router = express.Router();

export default (): Router => {
  router.get(
    '/transactions',
    asyncHandler(async (req: Request, res: Response) => {
      const result: ITransaction[] = await new PaymentService().findTransactions();
      return new SuccessResponse<ITransaction[]>('Successful', result).send(res);
    })
  );

  router.post(
    '/transactions',
    // Validator(Product.createProductSchema()),
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.body as ITransaction;
      const result = await new PaymentService().createTransaction(data);
      return new SuccessResponse<ITransaction>('Successful', result).send(res);
    })
  );

  router.get(
    '/transactions/:transactionId',
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.params.productId as unknown as mongoose.Types.ObjectId;
      const result: ITransaction | null = await new PaymentService().findTransactionById(data);
      return new SuccessResponse<ITransaction | null>('Successful', result).send(res);
    })
  );

  router.delete(
    '/transactions/:transactionId',
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.params.productId as unknown as mongoose.Types.ObjectId;
      const result: ITransaction | null = await new PaymentService().deleteTransaction(data);
      return new SuccessResponse<ITransaction | null>('Successful', result).send(res);
    })
  );

  return router;
};
