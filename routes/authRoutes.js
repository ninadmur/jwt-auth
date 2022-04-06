import express from 'express';
import {
  getsignIn,
  getsignUp,
  postsignIn,
  postsignUp,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/signup', getsignUp);
router.get('/signin', getsignIn);
router.post('/signup', postsignUp);
router.post('/signin', postsignIn);
// router.post('/logout', (req, res) => {});

export default router;
