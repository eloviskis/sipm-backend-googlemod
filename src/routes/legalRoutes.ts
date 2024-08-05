import { Router } from 'express';
import { getPrivacyPolicy, getTermsOfService } from '../controllers/legalController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/privacy-policy', authMiddleware, permissionMiddleware('ViewLegalDocuments'), getPrivacyPolicy);
router.get('/terms-of-service', authMiddleware, permissionMiddleware('ViewLegalDocuments'), getTermsOfService);

export default router;
