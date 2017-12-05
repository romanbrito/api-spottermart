import {Router} from 'express';
import * as controller from './messageController';
const router = Router();

router.param('user', controller.params);

router.get('/',controller.get);
router.get('/:user', controller.getByUser);
router.post('/',controller.post);

export default router;
