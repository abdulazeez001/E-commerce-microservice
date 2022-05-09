/**
 * @file Handles related authentication activities
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { Login, IUser, LoginResponse } from 'types';
import { IAuthentication } from './Interface';
import UserService from './UserService';
import BadRequestError from '../utilities/core/ApiError/BadRequestError';
import AuthFailureError from '../utilities/core/ApiError/AuthFailureError';

export default class AuthenticationService implements IAuthentication {
  /**
   * @description Login already registered customer using email and password
   * @param data - An object that contains the email and password
   * @return {Promise<LoginResponse>}
   */
  public async login(data: Login): Promise<LoginResponse> {
    const user = await new UserService().findUserByEmail(data.email);
    if (!user) throw new BadRequestError('Invalid Credentials');

    const correctPassword = user.comparePassword(data.password);
    if (!correctPassword) throw new AuthFailureError('Invalid Credentials');

    return { accessToken: user.createToken(), email: null };
  }

  /**
   * @description Registers a new user
   * @param data - an object that contains user firstName, lastName, email and password
   * @return {Promise<void>}
   */
  public async signup(data: IUser): Promise<void> {
    console.log(data);
    const existingUser = await new UserService().findUserByEmail(data.email);
    if (existingUser) throw new BadRequestError('Invalid Credentials', 'Email already exist');

    await new UserService().createUser(data);
  }
}
