/**
 * @file This is the main application configuration file. It reads environment variables using the
 * DotEnv Package @see {@link https://www.npmjs.com/package/dotenv} and exports the configuration as a module.
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import dotenv from 'dotenv';
import debug from 'debug';
import { Config } from 'types';

// load env configuration as early as possible
dotenv.config();
const appName: string = 'e-commerce-product';

const config: Config = {
  applicationName: appName,
  port: process.env.PORT!,
  mongodb: {
    dsn: process.env.NODE_ENV === 'production' ? process.env.MONGODB_PROD_URI! : process.env.MONGODB_LOCAL_URI!,
    options: {
      dbName: 'e-commerce-product',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  debugger: debug(`${appName}:server`),
};

export default config;
