import {Router} from 'express';
const router = Router();
//import userRoutes from './user/userRoutes';
import categoryRoutes from './category/categoryRoutes';
import postRoutes from './post/postRoutes';

import messageRoutes from './message/messageRoutes';
import auth from './message/auth/routes';
import userRoutes from './message/user/userRoutes';

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below


// can use httpie to test: $ http POST localhost:3000/api/categories name=cats
//http localhost:3000/api/users
// http POST localhost:3000/api/posts author=5a12f636c44f9998a514e636 title='learning node' text='learning node is fun, right?'
//http localhost:3000/api/posts/5a12f9ed0fd50595ad4602d9
// and with auto populate author wiht username and user id
//http PUT localhost:3000/api/posts/5a12f9ed0fd50595ad4602d9 text='text changed'
//http DELETE localhost:3000/api/posts/5a12f9ed0fd50595ad4602d9


router.use('/users', userRoutes);

router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);

router.use('/messages', messageRoutes);
router.use('/', auth);


export default router;