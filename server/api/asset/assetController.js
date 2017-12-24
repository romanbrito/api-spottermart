import Asset from './assetModel';

export const get = (req, res, next) => {
  Asset.find({})
    .populate('author', '-password')
    .populate('image')
    .exec()
    .then(assets => res.json(assets), err => next(err))
};