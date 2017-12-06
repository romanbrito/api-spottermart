import {Router} from 'express';
import * as controller from './messageController';
const router = Router();

router.param('id', controller.params);

router.route('/')
  .get(controller.get);

router.route('/:id')
  .get(controller.getOne);

export default router;
