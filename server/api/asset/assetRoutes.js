import {Router} from 'express';
import * as controller from './assetController';

const router = Router();

router.route('/')
.get(controller.get);

export default router;