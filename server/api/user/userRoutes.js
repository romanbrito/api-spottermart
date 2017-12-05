import {Router} from 'express';
import logger from '../../util/logger';
import * as controller from './userController';
import * as auth from '../../auth/auth';
const router = Router();
// checkUser will secure routes when on middleware
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route just to satisfy a request
// for building
router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.del);

export default router;