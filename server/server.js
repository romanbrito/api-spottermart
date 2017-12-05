import express from 'express';
import api from './api/api'; // router
import err from './middleware/err';
import config from './config/config';
import logger from './util/logger';
import auth from './auth/routes';
import mongoose from 'mongoose';
import middleware from './middleware/appMiddleware';

// db.url is different depending on NODE_ENV

mongoose.connect(config.db.url);

if (config.seed ) {
  require('./util/seed');
}

//setup the app middleware
const app = express();
middleware(app);

// try curl localhost:3000/api/users
// setup the api
app.use('/api', api);
app.use('/auth', auth);
// setup global error handling
app.use( (err, req, res, next) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app for testing
export default app;