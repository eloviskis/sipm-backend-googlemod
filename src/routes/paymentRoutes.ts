import { Router } from 'express';
import {
    createPayment,
    getPayments,
    getPayment,
    deletePayment
} from '../controllers/paymentController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Correção na importação

const router = Router();

// Middleware de autenticação
router.use(authMiddleware);

// Rotas de pagamento
router.post('/payments', createPayment);
router.get('/payments', getPayments);
router.get('/payments/:id', getPayment);
router.delete('/payments/:id', deletePayment);

export default router;
