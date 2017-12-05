import express from 'express';
import * as controller from './controller';
const router = express.Router();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);


export default router;