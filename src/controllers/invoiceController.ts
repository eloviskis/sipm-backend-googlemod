import { Request, Response } from 'express';
import { generateInvoice } from '../services/pdfService';

export const createInvoice = (req: Request, res: Response) => {
    try {
        const invoiceData = req.body;
        generateInvoice(res, invoiceData);
    } catch (error) {
        res.status(500).send(error);
    }
};
