import { Router } from 'express';
import { createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment, sendReminder } from '../controllers/appointmentController';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments', getAppointments);
router.get('/appointments/:id', getAppointment);
router.patch('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);
router.post('/appointments/:id/reminder', sendReminder);

export default router;
