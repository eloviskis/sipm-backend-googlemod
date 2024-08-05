import { Router, Request, Response } from 'express';
import { createInvoice } from '../controllers/invoiceController';
import { AuthRequest } from '../types'; // Certifique-se de que o caminho para o arquivo está correto
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/invoices', authMiddleware, permissionMiddleware('ManageInvoices'), (req: Request, res: Response) => createInvoice(req as AuthRequest, res));

export default router;
