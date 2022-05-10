/**
 * @file Manages all database queries related to the Customer document(table)
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { ITransaction } from 'types';
import { ITransactionRepository } from '../Interface';
import TransactionModel from '../models/Transaction';

export default class TransactionRepository implements ITransactionRepository {
  public async createTransaction(transaction: ITransaction): Promise<ITransaction> {
    return TransactionModel.create<ITransaction>(transaction);
  }

  public async findTransactionById(transactionId: mongoose.Types.ObjectId): Promise<ITransaction | null> {
    return TransactionModel.findById(transactionId);
  }

  public async findTransactions(): Promise<ITransaction[]> {
    return TransactionModel.find({});
  }

  public async deleteTransaction(transactionId: mongoose.Types.ObjectId): Promise<ITransaction | null> {
    return TransactionModel.findOneAndDelete({ _id: transactionId });
  }
}
