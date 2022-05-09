/**
 * @file Manages all database queries related to the Customer document(table)
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import mongoose from 'mongoose';
import { IUser } from 'types';
import { IUserRepository } from '../Interface';
import UserModel from '../models/User';

export default class UserRepository implements IUserRepository {
  public async createUser(user: IUser): Promise<IUser> {
    return UserModel.create<IUser>(user);
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  public async findUserById(userId: mongoose.Types.ObjectId): Promise<IUser | null> {
    return UserModel.findById(userId);
  }

  public async findUsers(): Promise<IUser[]> {
    return UserModel.find({});
  }

  public async deleteUser(userId: mongoose.Types.ObjectId): Promise<IUser | null> {
    return UserModel.findOneAndDelete({ _id: userId });
  }
}
