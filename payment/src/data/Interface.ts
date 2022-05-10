/**
 * @file This file defines interfaces implemented by the repository classes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { ITransaction } from 'types';

export interface ITransactionRepository {
  createTransaction(Transaction: ITransaction): Promise<ITransaction>;
  findTransactions(): Promise<ITransaction[]>;
  findTransactionById(TransactionId: mongoose.Types.ObjectId): Promise<ITransaction | null>;
  deleteTransaction(TransactionId: mongoose.Types.ObjectId): Promise<ITransaction | null>;
}
