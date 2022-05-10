/**
 * @file Defines the User routes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import express, { Request, Response, Router } from 'express';
import { IProduct } from 'types';
import asyncHandler from '../../utilities/core/asyncHandler';
import SuccessResponse from '../../utilities/core/ApiResponse/SuccessResponse';
import ProductService from '../../services/ProductService';
import Validator from '../../utilities/validators';
import Product from '../../utilities/validators/schemas/Product';
import mongoose from 'mongoose';
import axios from 'axios';

const router: Router = express.Router();

export default (): Router => {
  router.get(
    '/products',
    asyncHandler(async (req: Request, res: Response) => {
      const result: IProduct[] = await new ProductService().findProducts();
      return new SuccessResponse<IProduct[]>('Successful', result).send(res);
    })
  );

  router.post(
    '/products',
    Validator(Product.createProductSchema()),
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.body as IProduct;
      const result = await new ProductService().createProduct(data);
      return new SuccessResponse<IProduct>('Successful', result).send(res);
    })
  );

  router.get(
    '/products/:productId',
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.params.productId as unknown as mongoose.Types.ObjectId;
      const result: IProduct | null = await new ProductService().findProductById(data);
      return new SuccessResponse<IProduct | null>('Successful', result).send(res);
    })
  );

  router.post(
    '/products/:productId/order',
    asyncHandler(async (req: Request, res: Response) => {
      const pId = req.params.productId as unknown as mongoose.Types.ObjectId;
      const cId = res.locals.user?.id as unknown as mongoose.Types.ObjectId;
      const result: IProduct | null = await new ProductService().findProductById(pId);
      const config = {
        headers: { Authorization: `Bearer ${req.headers?.authorization?.split(' ')[1]}` },
      };

      const order_url = `${process.env.ORDER_URL as string}/orders` || `http://localhost:4002/orders`;
      const response = await axios.post(
        order_url,
        {
          customerId: cId,
          product: result,
        },
        config
      );
      return new SuccessResponse<IProduct | null>('Successful', response.data).send(res);
    })
  );

  router.delete(
    '/products/:productId',
    asyncHandler(async (req: Request, res: Response) => {
      const data = req.params.productId as unknown as mongoose.Types.ObjectId;
      const result: IProduct | null = await new ProductService().deleteProduct(data);
      return new SuccessResponse<IProduct | null>('Successful', result).send(res);
    })
  );

  return router;
};
