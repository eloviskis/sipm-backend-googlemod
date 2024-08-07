import { Router, Request, Response } from 'express';
import { createInvoice } from '../controllers/invoiceController';
import { AuthRequest } from '../types';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/invoices', authMiddleware, (req: Request, res: Response) => createInvoice(req as AuthRequest, res));

export default router;
