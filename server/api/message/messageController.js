import Message from './messageModel';

export const params = (req, res, next, id) => {
  Message.findById(id)
    .populate('author', '-password')
    .exec()
    .then(message => {
      if (!message) {
        next(new Error('No message with that id'));
      } else {
        req.message = message;
        next();
      }
    }, err => {
      next(err);
    });
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

export const getOne = (req, res, next) => {
  const message = req.message;
  res.json(message);
};

export const post = (req, res, next) => {
  Message.create(req.body)
    .then(message => {
      res.json(message);
    }, err => {
      next(err);
    })
};