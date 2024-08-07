import { Router } from 'express';
import { createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment, sendReminder } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/appointments', authMiddleware, createAppointment);
router.get('/appointments', authMiddleware, getAppointments);
router.get('/appointments/:id', authMiddleware, getAppointment);
router.patch('/appointments/:id', authMiddleware, updateAppointment);
router.delete('/appointments/:id', authMiddleware, deleteAppointment);
router.post('/appointments/:id/reminder', authMiddleware, sendReminder);

export default router;
