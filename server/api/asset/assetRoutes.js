import {Router} from 'express';
import * as controller from './assetController';

const router = Router();

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);;

router.route('/:id')
  .get(controller.getOne);

export default router;