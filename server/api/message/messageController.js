import Message from './messageModel';

export const params = (req, res, next, user) => {
  const result = messages.filter(message => message.owner == user);
  req.result = result;
  console.log(req.result);
  next();
};

export const get = (req, res, next) => {
  Message.find({})
    .populate('author', '-password')
    .exec()
    .then( messages => {
      console.log(messages);
      res.json(messages);
    }, err => {
      next(err)
    })
};

export const getByUser = (req, res, next) => {
  res.json(req.result);
};

export const post = (req, res, next) => {
  messages.push(req.body);
  res.json(req.body);
};