import {Router} from 'express';
import multer from 'multer';
import * as controller from "./imageController";

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file-to-upload'), (req, res) => {
  console.log(req.file);
  res.json('hello');
});



//.post(controller.post);

export default router;