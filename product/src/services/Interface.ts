/**
 * @file This file defines interfaces implemented by the repository classes
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { IUser, Login, LoginResponse } from 'types';

export interface IAuthentication {
  login(data: Login): Promise<LoginResponse>;
  signup(data: IUser): Promise<void>;
}
