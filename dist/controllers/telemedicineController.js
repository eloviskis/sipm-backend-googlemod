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
exports.getToken = exports.createRoom = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const telemedicineService_1 = require("../services/telemedicineService");
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const videoRoomsCollection = db.collection('videoRooms');
// Função para validar dados da sala de videoconferência
const validateRoomData = (roomName) => {
    if (!roomName || typeof roomName !== 'string') {
        throw new Error('O nome da sala é obrigatório e deve ser uma string.');
    }
};
// Função para validar identidade para token de vídeo
const validateIdentity = (identity) => {
    if (!identity || typeof identity !== 'string') {
        throw new Error('A identidade é obrigatória e deve ser uma string.');
    }
};
// Função para criar uma nova sala de videoconferência
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomName } = req.body;
        // Validação dos dados da sala de videoconferência
        validateRoomData(roomName);
        const room = yield (0, telemedicineService_1.createVideoRoom)(roomName);
        // Salvar metadados da sala de videoconferência no Firestore
        const roomData = {
            roomName,
            sid: room.sid,
            dateCreated: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
        };
        const docRef = yield videoRoomsCollection.add(roomData);
        const savedRoom = yield docRef.get();
        (0, logger_1.default)('info', `Sala de videoconferência criada: ${room.sid}`);
        res.status(201).send(Object.assign({ id: docRef.id }, savedRoom.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao criar sala de videoconferência: ${error.message}`);
        res.status(400).send({ error: error.message });
    }
});
exports.createRoom = createRoom;
// Função para gerar um token de vídeo
const getToken = (req, res) => {
    try {
        const { identity } = req.body;
        // Validação da identidade para token de vídeo
        validateIdentity(identity);
        const token = (0, telemedicineService_1.generateVideoToken)(identity);
        (0, logger_1.default)('info', `Token de vídeo gerado para: ${identity}`);
        res.send({ token });
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao gerar token de vídeo: ${error.message}`);
        res.status(400).send({ error: error.message });
    }
};
exports.getToken = getToken;
