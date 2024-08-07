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
exports.getDashboardData = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
// Função para obter dados do painel
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recuperar dados do Firestore
        const usersSnapshot = yield db.collection('users').get();
        const reportsSnapshot = yield db.collection('reports').get();
        const appointmentsSnapshot = yield db.collection('appointments').get();
        // Construir dados do painel
        const data = [
            { id: 1, title: 'Usuários Registrados', description: `Total de ${usersSnapshot.size} usuários` },
            { id: 2, title: 'Relatórios Gerados', description: `Total de ${reportsSnapshot.size} relatórios` },
            { id: 3, title: 'Consultas Agendadas', description: `Total de ${appointmentsSnapshot.size} consultas` },
        ];
        (0, logger_1.default)('info', 'Dados do painel obtidos com sucesso');
        res.status(200).send(data);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter dados do painel:', error);
        res.status(500).send({ error: 'Erro ao obter dados do painel' });
    }
});
exports.getDashboardData = getDashboardData;
