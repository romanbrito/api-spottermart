import {Router} from 'express';
import * as controller from './messageController';
import * as auth from '../../auth/auth';

const router = Router();

// checkUser will secure routes when on middleware
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(checkUser, controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne);

export default router;
