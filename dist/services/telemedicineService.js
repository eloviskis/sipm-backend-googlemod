"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoRoom = exports.generateVideoToken = void 0;
const twilio_1 = __importDefault(require("twilio"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Configuração do Twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'default_twilio_account_sid';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || 'default_twilio_auth_token';
const twilioClient = (0, twilio_1.default)(twilioAccountSid, twilioAuthToken);
const videoServiceSid = process.env.TWILIO_VIDEO_SERVICE_SID || 'default_twilio_video_service_sid';
// Função para gerar token de vídeo
const generateVideoToken = (identity) => {
    const AccessToken = twilio_1.default.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
    const token = new AccessToken(twilioAccountSid, process.env.TWILIO_API_KEY || 'default_twilio_api_key', process.env.TWILIO_API_SECRET || 'default_twilio_api_secret', {
        identity: identity,
    });
    const videoGrant = new VideoGrant({
        room: 'DailyStandup',
    });
    token.addGrant(videoGrant);
    (0, logger_1.default)('info', `Token de vídeo gerado para: ${identity}`); // Adicionando log de geração de token
    return token.toJwt();
};
exports.generateVideoToken = generateVideoToken;
// Função para criar sala de vídeo
const createVideoRoom = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield twilioClient.video.rooms.create({
            uniqueName: roomName,
            type: 'group',
        });
        (0, logger_1.default)('info', `Sala de vídeo criada: ${room.sid}`); // Adicionando log de criação de sala
        return room;
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao criar sala de vídeo: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao criar sala de vídeo: ${error.message}`);
    }
});
exports.createVideoRoom = createVideoRoom;
