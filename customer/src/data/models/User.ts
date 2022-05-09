/**
 * @file This file defines the User schema which mongoose uses to store and retrieve data from the mongodb User
 * collection. It also creates virtual, methods, statics helper functions and exports it as a model
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { model, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from 'types';
import JsonWebToken from '../../utilities/core/JsonWebToken';

const SALT_WORK_FACTOR = 10;

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: [true, 'firstName is required'] },
  lastName: { type: String, required: [true, 'lastName is required'] },
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'email is required'],
  },
  password: { type: String, trim: true, required: [true, 'password is required'] },
});

/**
 * Before saving a customer password, generate the salt and produce the hash value
 */
UserSchema.pre<IUser>('save', function preSave(next) {
  const user = this;

  /**
   *  A useful condition for the OAuth Services, prevents the empty string password
   *  from being hashed. Password field would be empty since we are using oAuth
   */
  if (user.password === '') return next();

  // only hash the password if it has been modified (or is new)
  if (user.isModified('password') || user.isNew) {
    // generate a salt
    return bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error, salt: string) => {
      if (err) return next(err);
      // hash the password using our new salt
      return bcrypt.hash(user.password, salt, (hashErr: Error, hash: string) => {
        if (hashErr) return next(hashErr);
        // override the cleartext password with the hashed one
        user.password = hash;
        return next();
      });
    });
  }
  return next();
});

/**
 * Decrypts the encrypted password and compares it to the provided password during login
 * @param candidatePassword String - plain password
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * @description creates jwt token for current customer
 * @return String - token string
 */
UserSchema.methods.createToken = function () {
  const user = this as IUser;
  const jwt = new JsonWebToken(user);
  return jwt.create();
};

const UserModel: Model<IUser> = model<IUser>('users', UserSchema);
export default UserModel;
