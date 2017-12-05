import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../config/config';
import User from '../api/user/userModel';

// check if it works: http POST localhost:3000/auth/signin username=Jimmylo password=test
//

const checkToken = expressJwt({ secret:config.secrets.jwt });

export const decodeToken = () => {
  return (req, res, next) => {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  }
};

export const getFreshUser = () => {
  return (req, res, next ) => {
    // we'll have access to req.user here
    // because we'll use decodeToken in before
    // this function in the middleware stack.
    // req.user will just be an object with the user
    // id on it. We want the full user object/
    // if no user is found it
    // was a valid JWT but didn't decode
    // to a real user in our DB. Either the user was deleted
    // since the client got the JWT, or
    // it was a JWT from some other source

    // update req.user with fresh user from the
    // stale token data
    User.findById(req.user._id)
      .then((user) => {
      if (!user) {
        // if no user is found it was not
        // it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source
        res.status(401).send('Unauthorized');
      } else {
        // update req.user with fresh user from
        // stale token data
        req.user = user;
        next();
      }
      }, (err) => {
      next(err);
      });
  }
};

export const verifyUser = () => {
  return (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // if no username or password then stop.
    if (!username || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({username}) // same as username: username es6
      .then((user) => {
      if (!user) {
        res.status(401).send('No user with the given username');
      } else {
        // checking the passowords here
        // use the authenticate() method on a user doc. Passing
        // in the posted password, it will hash the
        // password the same way as the current passwords got hashed
        if (!user.authenticate(password)) {
          res.status(401).send('Wrong password');
        } else {
          // if everything is good,
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user;
          next();
        }
      }
      }, (err) => {
      next(err);
      })
  }
};

// util method to sign tokens on signup
export const signToken = (id) => {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  )
};