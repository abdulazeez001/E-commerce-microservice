/**
 * @file This file defines interfaces implemented by the repository classes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { IUser } from 'types';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findUsers(): Promise<IUser[]>;
  findUserById(userId: mongoose.Types.ObjectId): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  deleteUser(userId: mongoose.Types.ObjectId): Promise<IUser | null>;
}
