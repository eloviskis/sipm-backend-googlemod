import { Router } from 'express';
import { createPage, getPages, getPage, updatePage, deletePage } from '../controllers/pageController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/pages', authMiddleware, permissionMiddleware('CreatePage'), createPage);
router.get('/pages', authMiddleware, permissionMiddleware('ViewPages'), getPages);
router.get('/pages/:id', authMiddleware, permissionMiddleware('ViewPage'), getPage);
router.patch('/pages/:id', authMiddleware, permissionMiddleware('UpdatePage'), updatePage);
router.delete('/pages/:id', authMiddleware, permissionMiddleware('DeletePage'), deletePage);

export default router;
