import { Request, Response } from 'express';
import { sendWhatsAppMessage } from '../services/whatsappService';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { to, message } = req.body;
        const response = await sendWhatsAppMessage(to, message);
        res.send(response);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
