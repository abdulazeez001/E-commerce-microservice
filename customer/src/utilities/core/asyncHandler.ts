/**
 * @file This file exports a function with some syntactic sugar to replace the ugly try/catch block needed to
 * use async/await. Use it as a wrapper for  any function that requires a try/catch block.
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};
