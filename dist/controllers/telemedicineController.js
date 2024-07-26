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
const telemedicineService_1 = require("../services/telemedicineService");
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para criar uma nova sala de videoconferência
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, telemedicineService_1.createVideoRoom)(req.body.roomName);
        (0, logger_1.default)('info', `Sala de videoconferência criada: ${room.sid}`); // Adicionando log de criação de sala
        res.status(201).send(room);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar sala de videoconferência:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createRoom = createRoom;
// Função para gerar um token de vídeo
const getToken = (req, res) => {
    try {
        const token = (0, telemedicineService_1.generateVideoToken)(req.body.identity);
        (0, logger_1.default)('info', `Token de vídeo gerado para: ${req.body.identity}`); // Adicionando log de geração de token
        res.send({ token });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao gerar token de vídeo:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};
exports.getToken = getToken;
