import { Router } from 'express';
import { createDocumentTemplate, getDocumentTemplates, getDocumentTemplate, updateDocumentTemplate, deleteDocumentTemplate } from '../controllers/documentTemplateController';

const router = Router();

router.post('/document-templates', createDocumentTemplate);
router.get('/document-templates', getDocumentTemplates);
router.get('/document-templates/:id', getDocumentTemplate);
router.patch('/document-templates/:id', updateDocumentTemplate);
router.delete('/document-templates/:id', deleteDocumentTemplate);

export default router;
