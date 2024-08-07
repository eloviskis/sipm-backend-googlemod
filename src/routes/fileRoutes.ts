import { Router } from 'express';
import { uploadFile, uploadMiddleware } from '../controllers/fileController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/upload', authMiddleware, uploadMiddleware, uploadFile);

export default router;
