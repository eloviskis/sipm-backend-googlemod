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
// Configuração do Twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = (0, twilio_1.default)(twilioAccountSid, twilioAuthToken);
const videoServiceSid = process.env.TWILIO_VIDEO_SERVICE_SID;
// Função para gerar token de vídeo
const generateVideoToken = (identity) => {
    const AccessToken = twilio_1.default.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
    const token = new AccessToken(twilioAccountSid, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
        identity: identity,
    });
    const videoGrant = new VideoGrant({
        room: 'DailyStandup',
    });
    token.addGrant(videoGrant);
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
        return room;
    }
    catch (error) {
        throw new Error(`Erro ao criar sala de vídeo: ${error.message}`);
    }
});
exports.createVideoRoom = createVideoRoom;
