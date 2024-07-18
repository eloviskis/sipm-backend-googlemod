import { Twilio } from 'twilio';

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
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};
