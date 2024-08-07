import { Router } from 'express';
import { getPrivacyPolicy, getTermsOfService } from '../controllers/legalController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/privacy-policy', authMiddleware, getPrivacyPolicy);
router.get('/terms-of-service', authMiddleware, getTermsOfService);

export default router;
