import Twilio from 'twilio';

// Configuração do Twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioClient = Twilio(twilioAccountSid, twilioAuthToken);

const videoServiceSid = process.env.TWILIO_VIDEO_SERVICE_SID!;

// Função para gerar token de vídeo
export const generateVideoToken = (identity: string) => {
    const AccessToken = Twilio.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    const token = new AccessToken(twilioAccountSid, process.env.TWILIO_API_KEY!, process.env.TWILIO_API_SECRET!, {
        identity: identity,
    });

    const videoGrant = new VideoGrant({
        room: 'DailyStandup',
    });

    token.addGrant(videoGrant);

    return token.toJwt();
};

// Função para criar sala de vídeo
export const createVideoRoom = async (roomName: string) => {
    try {
        const room = await twilioClient.video.rooms.create({
            uniqueName: roomName,
            type: 'group',
        });

        return room;
    } catch (error) {
        throw new Error(`Erro ao criar sala de vídeo: ${error.message}`);
    }
};
