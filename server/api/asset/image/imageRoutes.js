import {Router} from 'express';
import multer from 'multer';
import fs from 'fs';
import * as controller from "./imageController";
import Image from './imageModel';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname)
  }
});
const upload = multer({storage});

router.post('/', upload.single('file-to-upload'), (req, res) => {
  const newImage = new Image();
  newImage.img.data = fs.readFileSync('uploads/file-to-upload');
  newImage.img.contentType = 'image/jpeg';
  newImage.save();

  console.log(req.file);
  res.json({'message': 'File uploaded successfully'});
});



//.post(controller.post);

export default router;