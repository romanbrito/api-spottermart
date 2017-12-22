import {Router} from 'express';
import multer from 'multer';
import * as controller from "./imageController";

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

router.param('id', controller.params);

router.route('/')
  .post(upload.single('file-to-upload'), controller.post);


router.route('/:id')
  .get(controller.getOne);

export default router;