import axios from 'axios';

const whatsappApiUrl = process.env.WHATSAPP_API_URL || 'https://your-whatsapp-api-url.com/send-message';
const apiToken = process.env.WHATSAPP_API_TOKEN || 'your_api_token';

export const sendWhatsAppMessage = async (to: string, message: string) => {
    try {
        const response = await axios.post(
            whatsappApiUrl,
            {
                to,
                message,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Erro ao enviar mensagem: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Erro ao enviar mensagem: ${error.message}`);
    }
};
