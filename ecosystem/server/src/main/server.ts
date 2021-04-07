/* eslint-disable no-console */
import dotenv from 'dotenv';

import '../lib/module-alias';
import { MongoHelper } from '@external/mongodb/helpers/mongo-helper';
import env from '@main/config/env';

dotenv.config();

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('@main/config/app')).default;
    app.listen(env.port, () => console.log(`Server running at ${env.port}`));
  })
  .catch(console.error);
