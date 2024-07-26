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
exports.deleteNotification = exports.getNotification = exports.getNotifications = exports.createNotification = void 0;
const notification_1 = __importDefault(require("../models/notification"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para criar uma nova notificação
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = new notification_1.default(req.body);
        const savedNotification = yield notification.save();
        (0, logger_1.default)('info', `Notificação criada: ${savedNotification._id}`); // Adicionando log de criação de notificação
        res.status(201).send(savedNotification);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar notificação:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createNotification = createNotification;
// Função para obter todas as notificações
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_1.default.find({});
        res.send(notifications);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter notificações:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getNotifications = getNotifications;
// Função para obter uma notificação específica
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_1.default.findById(req.params.id);
        if (!notification) {
            (0, logger_1.default)('error', `Notificação não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(notification);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter notificação:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getNotification = getNotification;
// Função para deletar uma notificação específica
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_1.default.findByIdAndDelete(req.params.id);
        if (!notification) {
            (0, logger_1.default)('error', `Notificação não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Notificação deletada: ${notification._id}`); // Adicionando log de deleção de notificação
        res.send(notification);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar notificação:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteNotification = deleteNotification;
