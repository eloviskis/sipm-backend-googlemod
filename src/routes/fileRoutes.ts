import { Router } from 'express';
import { uploadFile, uploadMiddleware } from '../controllers/fileController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/upload', authMiddleware, permissionMiddleware('ManageFiles'), uploadMiddleware, uploadFile);

export default router;
