/**
 * @file This file defines the User schema which mongoose uses to store and retrieve data from the mongodb User
 * collection. It also creates virtual, methods, statics helper functions and exports it as a model
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { model, Schema, Model } from 'mongoose';
import { ITransaction } from 'types';

const TransactionSchema: Schema = new Schema({
  customerId: { type: String, required: [true, 'customerId is required'] },
  productId: { type: String, required: [true, 'productId is required'] },
  orderId: { type: String, required: [true, 'orderId is required'] },
  amount: { type: Number, trim: true, required: [true, 'amonut is required'] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TransactionModel: Model<ITransaction> = model<ITransaction>('transactions', TransactionSchema);
export default TransactionModel;
