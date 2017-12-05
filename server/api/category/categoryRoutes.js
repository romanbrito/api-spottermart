import {Router} from 'express';
const router = Router();
import logger from '../../util/logger';
import * as controller from './categoryController';
import * as auth from '../../auth/auth';
// checkUser will secure routes when on middleware
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route just to satisfy a request
// for building
router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.del);

export default router;