import { Router } from 'express';
import { createPage, getPages, getPage, updatePage, deletePage } from '../controllers/pageController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/pages', authMiddleware, createPage);
router.get('/pages', authMiddleware, getPages);
router.get('/pages/:id', authMiddleware, getPage);
router.patch('/pages/:id', authMiddleware, updatePage);
router.delete('/pages/:id', authMiddleware, deletePage);

export default router;
