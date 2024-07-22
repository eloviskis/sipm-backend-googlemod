import { Twilio } from 'twilio';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_FROM!;
const client = new Twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (to: string, message: string) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: `whatsapp:${fromWhatsAppNumber}`,
            to: `whatsapp:${to}`,
        });

        logger('info', `Mensagem enviada para ${to}: ${response.sid}`); // Adicionando log de sucesso
        return response;
    } catch (error: any) {
        logger('error', `Erro ao enviar mensagem para ${to}: ${error.message}`); // Adicionando log de erro
        throw new Error(error.message);
    }
};
