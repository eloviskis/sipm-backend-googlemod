import { AuthRequest } from '../types'; // Certifique-se de que o caminho para o arquivo está correto
import { Request, Response } from 'express';
import { generateInvoice } from '../services/pdfService';
import { sendInvoiceEmail } from '../services/invoiceNotificationService';
import logger from '../middlewares/logger';

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

        logger('info', `Fatura gerada e enviada: ${invoicePath}`);

        res.status(201).send({ message: 'Fatura gerada e enviada com sucesso' });
    } catch (error) {
        if (error instanceof Error) {
            logger('error', `Erro ao criar fatura: ${error.message}`, error);
            res.status(500).send({ error: 'Erro ao criar fatura', details: error.message });
        } else {
            logger('error', 'Erro ao criar fatura:', error);
            res.status(500).send({ error: 'Erro ao criar fatura', details: 'Erro desconhecido' });
        }
    }
};
