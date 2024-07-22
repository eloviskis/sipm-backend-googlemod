import { Request, Response } from 'express';
import { generateInvoice } from '../services/pdfService';
import { sendInvoiceEmail } from '../services/invoiceNotificationService';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

interface AuthRequest extends Request {
    user?: {
        _id: string;
        email: string;
    };
}

export const createInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const invoiceData = req.body;

        // Verificar se req.user está definido e possui a propriedade email
        if (!req.user || !req.user.email) {
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }

        // Gerar a fatura em PDF e obter o caminho do arquivo
        const invoicePath = await generateInvoice(invoiceData);

        // Enviar a fatura por e-mail
        await sendInvoiceEmail(req.user.email, invoicePath);

        logger('info', `Fatura gerada e enviada: ${invoicePath}`); // Adicionando log de criação de fatura

        res.status(201).send({ message: 'Fatura gerada e enviada com sucesso' });
    } catch (error) {
        logger('error', 'Erro ao criar fatura:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
