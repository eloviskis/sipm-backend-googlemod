import { Router, Request, Response } from 'express';
import { createInvoice } from '../controllers/invoiceController';
import { AuthRequest } from '../types'; // Certifique-se de que o caminho para o arquivo está correto

const router = Router();

router.post('/invoices', (req: Request, res: Response) => createInvoice(req as AuthRequest, res));

export default router;
