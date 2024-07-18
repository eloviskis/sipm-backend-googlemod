import { Router } from 'express';
import { createInvoice } from '../controllers/invoiceController';

const router = Router();

router.post('/invoices', createInvoice);

export default router;
