/**
 * @file This file defines interfaces implemented by the repository classes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { IProduct } from 'types';

export interface IProductRepository {
  createProduct(product: IProduct): Promise<IProduct>;
  findProducts(): Promise<IProduct[]>;
  findProductById(productId: mongoose.Types.ObjectId): Promise<IProduct | null>;
  deleteProduct(productId: mongoose.Types.ObjectId): Promise<IProduct | null>;
}
