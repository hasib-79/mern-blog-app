import express from 'express'
import { createPost, updatePost, fetchPosts, fetchPostWithId } from '../controllers/postController.js'
import upload from '../middleware/multer.js'
import { protectRoute } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/create', protectRoute, upload.single('postImg'), createPost);
router.put('/update/:id', upload.single('postImg'), updatePost);
router.get('/all-posts', fetchPosts);
router.get('/:id', fetchPostWithId);

export default router;