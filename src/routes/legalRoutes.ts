import { Router } from 'express';
import { getPrivacyPolicy, getTermsOfService } from '../controllers/legalController';

const router = Router();

router.get('/privacy-policy', getPrivacyPolicy);
router.get('/terms-of-service', getTermsOfService);

export default router;
