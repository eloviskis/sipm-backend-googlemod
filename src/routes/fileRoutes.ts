import { Router } from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/fileController';

const router = Router();
const upload = multer();

// Rota para upload de documentos
router.post('/upload', upload.single('file'), uploadDocument);

export default router;
