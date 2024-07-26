import Twilio from 'twilio';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Configuração do Twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'default_twilio_account_sid';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || 'default_twilio_auth_token';
const twilioClient = Twilio(twilioAccountSid, twilioAuthToken);

const videoServiceSid = process.env.TWILIO_VIDEO_SERVICE_SID || 'default_twilio_video_service_sid';

// Função para gerar token de vídeo
export const generateVideoToken = (identity: string) => {
    const AccessToken = Twilio.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    const token = new AccessToken(twilioAccountSid, process.env.TWILIO_API_KEY || 'default_twilio_api_key', process.env.TWILIO_API_SECRET || 'default_twilio_api_secret', {
        identity: identity,
    });

    const videoGrant = new VideoGrant({
        room: 'DailyStandup',
    });

    token.addGrant(videoGrant);

    logger('info', `Token de vídeo gerado para: ${identity}`); // Adicionando log de geração de token
    return token.toJwt();
};

// Função para criar sala de vídeo
export const createVideoRoom = async (roomName: string) => {
    try {
        const room = await twilioClient.video.rooms.create({
            uniqueName: roomName,
            type: 'group',
        });

        logger('info', `Sala de vídeo criada: ${room.sid}`); // Adicionando log de criação de sala
        return room;
    } catch (error: any) {
        logger('error', `Erro ao criar sala de vídeo: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao criar sala de vídeo: ${error.message}`);
    }
};
