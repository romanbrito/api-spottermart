import User from './userModel';
import _ from 'lodash';
import {signToken} from '../../auth/auth';

export const params = (req, res, next, id) => {
  User.findByid(id)
    .select('-password') // means don't select the password
    .exec()
    .then((user) => {
    if (!user) {
      next(new Error('No suer with that id'));
    } else {
      req.user = user;
      next();
    }
    }, (err) => {
    next(err);
    })
};

export const get = (req, res, next) => {
  User.find({})
    .select('-password') // means don't select the password
    .exec()
    .then((users) =>{
    res.json(users.map((user)=>{
      return user.toJson();
    }));
    }, (err) =>{
    next(err);
    })
};

export const getOne = (req, res, next) => {
  const user = req.user;
  res.json(user.toJson());
};

export const put = (req, res, next) =>{
  const user = req.user;
  const update = req.body;
  _.merge(user, update);

  user.save((err, saved) =>{
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  })
};

export const post = (req, res, next) =>{
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if(err) { return next(err)}

    const token = signToken(user._id);
    res.json({token}) // same as token:token
  })
};

export const del = (req, res, next) =>{
  req.user.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  })
};

export const me = (req, res) => {
  res.json(req.user.toJson());
};