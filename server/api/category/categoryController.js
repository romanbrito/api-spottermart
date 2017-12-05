import Category from './categoryModel';
import _ from 'lodash';

export const params = (req, res, next, id) => {
  // use the id and attach the category to req
  Category.findById(id)
  //.exec( (err, node) =>{....
    .then((category) => {
    if (!category) {
      next(new Error('No category with that id'));
    } else {
      req.category = category;
      next();
    }
    }, (err) => {
    next(err);
    })
};

export const get = (req, res, next) => {
  Category.find({})
    .then((categories) => {
    res.json(categories);
    }, (err) => {
    next(err);
    })
};

export const getOne = (req, res, next) => {
  const category = req.category;
  res.json(category);
};

export const put = (req, res, next) => {
  const category = req.category;
  const update = req.body;
  _.merge(category, update);

  category.save( (err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

export const post = (req, res, next) => {
  const newcategory = req.body;

  Category.create(newcategory)
    .then( (category) => {
      res.json(category);
    }, (err) => {
      next(err);
    });
};

export const del = (req, res, next) => {
  req.category.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};