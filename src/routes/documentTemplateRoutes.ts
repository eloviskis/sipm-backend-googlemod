import { Router } from 'express';
import { createDocumentTemplate, getDocumentTemplates, getDocumentTemplate, updateDocumentTemplate, deleteDocumentTemplate } from '../controllers/documentTemplateController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/document-templates', authMiddleware, permissionMiddleware('ManageDocumentTemplates'), createDocumentTemplate);
router.get('/document-templates', authMiddleware, permissionMiddleware('ViewDocumentTemplates'), getDocumentTemplates);
router.get('/document-templates/:id', authMiddleware, permissionMiddleware('ViewDocumentTemplates'), getDocumentTemplate);
router.patch('/document-templates/:id', authMiddleware, permissionMiddleware('ManageDocumentTemplates'), updateDocumentTemplate);
router.delete('/document-templates/:id', authMiddleware, permissionMiddleware('ManageDocumentTemplates'), deleteDocumentTemplate);

export default router;
