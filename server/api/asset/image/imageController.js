import Image from './imageModel';
import fs from 'fs';

export const params = (req, res, next, id) => {
  Image.findById(id)
    .exec()
    .then(image => {
      if (!image) {
        next(new Error('No image with that id'));
      } else {
        req.image = image.img;
        next();
      }
    }, err => {
      next(err);
    });
};

export const post = (req, res, next) => {
  const newImage = new Image();
  newImage.img.data = fs.readFileSync('uploads/file-to-upload');
  newImage.img.contentType = 'image/jpeg';
  newImage.save();

  console.log(req.file);
  res.json({'message': 'File uploaded successfully'});
};

export const getOne = (req, res, next) => {
  const image = req.image;
  res.contentType(image.contentType);
  res.send(image.data);
};