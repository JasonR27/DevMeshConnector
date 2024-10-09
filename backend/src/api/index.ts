import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import posts from './posts';
import users from './users';
import profile from './profiles';
import picture from './pictures';
import like from './likes';
import signup from './signup';
import login from './login';
// import like from './likes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/users', users);
router.use('/posts', posts);
router.use('/profiles', profile);
router.use('/pictures', picture);
router.use('/likes', like);
router.use('/auth', signup, login);

export default router;
