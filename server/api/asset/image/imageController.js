import Image from './imageModel';

export const post = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  res.json({'message': 'File uploaded successfully'});
};