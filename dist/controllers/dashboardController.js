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
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Simulação de dados para o painel
        const data = [
            { id: 1, title: 'Usuários Registrados', description: 'Total de 1500 usuários' },
            { id: 2, title: 'Relatórios Gerados', description: 'Total de 300 relatórios' },
            { id: 3, title: 'Consultas Agendadas', description: 'Total de 200 consultas' },
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
