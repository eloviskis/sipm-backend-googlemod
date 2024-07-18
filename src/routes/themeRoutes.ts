import { Router } from 'express';
import { createTheme, getThemes, getTheme, updateTheme, deleteTheme } from '../controllers/themeController';

const router = Router();

router.post('/themes', createTheme);
router.get('/themes', getThemes);
router.get('/themes/:id', getTheme);
router.patch('/themes/:id', updateTheme);
router.delete('/themes/:id', deleteTheme);

export default router;
