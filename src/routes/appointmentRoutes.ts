import { Router } from 'express';
import { createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment, sendReminder } from '../controllers/appointmentController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/appointments', authMiddleware, permissionMiddleware('ManageAppointments'), createAppointment);
router.get('/appointments', authMiddleware, permissionMiddleware('ViewAppointments'), getAppointments);
router.get('/appointments/:id', authMiddleware, permissionMiddleware('ViewAppointments'), getAppointment);
router.patch('/appointments/:id', authMiddleware, permissionMiddleware('ManageAppointments'), updateAppointment);
router.delete('/appointments/:id', authMiddleware, permissionMiddleware('ManageAppointments'), deleteAppointment);
router.post('/appointments/:id/reminder', authMiddleware, permissionMiddleware('ManageAppointments'), sendReminder);

export default router;
