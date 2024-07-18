import { Router } from 'express';
import { updateThemePreferences } from '../controllers/themePreferencesController';

const router = Router();

router.patch('/theme-preferences/:userId', updateThemePreferences);

export default router;
