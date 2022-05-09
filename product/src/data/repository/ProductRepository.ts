/**
 * @file Manages all database queries related to the Customer document(table)
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { IProduct } from 'types';
import { IProductRepository } from '../Interface';
import ProductModel from '../models/Product';

export default class ProductRepository implements IProductRepository {
  public async createProduct(product: IProduct): Promise<IProduct> {
    return ProductModel.create<IProduct>(product);
  }

  public async findProductById(productId: mongoose.Types.ObjectId): Promise<IProduct | null> {
    return ProductModel.findById(productId);
  }

  public async findProducts(): Promise<IProduct[]> {
    return ProductModel.find({});
  }

  public async deleteProduct(productId: mongoose.Types.ObjectId): Promise<IProduct | null> {
    return ProductModel.findOneAndDelete({ _id: productId });
  }
}
