import Asset from './assetModel';

export const params = (req, res, next, id) => {
  Asset.findById(id)
    .populate('author', '-password')
    .populate('image')
    .exec()
    .then(asset => {
      if (!asset) {
        next(new Error('No asset with that id'));
      } else {
        req.asset = asset;
        next();
      }
    }, err => next(err))
};

export const get = (req, res, next) => {
  Asset.find({})
    .populate('author', '-password')
    .populate('image')
    .exec()
    .then(assets => res.json(assets), err => next(err))
};

export const getOne = (req, res, next) => {
  const asset = req.asset;
  res.json(asset);
};

export const post = (req, res, next) => {
  Asset.create(req.body)
    .then(asset => res.json(asset),
      err => next(err));
};

export const me = (req, res) => {
  Asset.findOne({
    BusinessName: req.params.BusName
  })
    .populate('author', '-password')
    .populate('image')
    .exec()
    .then(asset => res.json(asset))
};