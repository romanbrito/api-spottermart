import Post from './postModel';
import _ from 'lodash';

export const params = (req, res, next, id) =>{
  Post.findById(id)
    .populate('author', 'username') // will give you the author object but only 'username'
    // only 'author' will give the entire object
    .exec() // because populate does not return a promise but then do
    .then((post) => {
    if (!post) {
      next(new Error('No post with that id'));
    } else {
      req.post = post;
      next();
    }
    }, (err) => {
    next(err);
    });
};

export const get = (req, res, next) => {
  // need to populate here
  Post.find({})
    .populate('author categories')
    .exec()
    .then((posts) => {
    res.json(posts);
    }, (err) => {
    next(err);
    })
};

export const getOne = (req, res, next) => {
  const post = req.post;
  res.json(post);
};

export const put = (req, res, next) =>{
  const post = req.post;
  const update = req.body;
  _.merge(post, update);

  post.save((err,saved)=>{
    if (err){
      next(err);
    } else {
      res.json(saved);
    }
  })
};

export const post = (req, res, next) => {
  const newpost = req.body;
  newpost.author = req.user._id;
  Post.create(newpost)
    .then((post) => {
    res.json(post);
    }, (err) => {
    next(err);
    })
};

export const del = (req, res, next)=>{
  req.post.remove((err, removed)=> {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  })
};