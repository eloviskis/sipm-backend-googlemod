import { Router } from 'express';
import { uploadFile, uploadMiddleware } from '../controllers/fileController';

const router = Router();

router.post('/upload', uploadMiddleware, uploadFile);

export default router;
