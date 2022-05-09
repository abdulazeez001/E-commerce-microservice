/**
 * @file This file defines the User schema which mongoose uses to store and retrieve data from the mongodb User
 * collection. It also creates virtual, methods, statics helper functions and exports it as a model
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { model, Schema, Model } from 'mongoose';
import { IProduct } from 'types';

const ProductSchema: Schema = new Schema({
  name: { type: String, required: [true, 'name is required'] },
  description: { type: String, required: [true, 'description is required'] },
  price: { type: Number, trim: true, required: [true, 'price is required'] },
});

const ProductModel: Model<IProduct> = model<IProduct>('products', ProductSchema);
export default ProductModel;
