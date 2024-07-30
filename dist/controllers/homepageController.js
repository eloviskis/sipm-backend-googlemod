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
exports.getHomepageContent = void 0;
const logger_1 = __importDefault(require("../middlewares/logger"));
const getHomepageContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = {
            heroTitle: 'Bem-vindo ao SIPM',
            heroSubtitle: 'O Sistema Integrado de Prontuário Médico (SIPM) facilita a gestão de sua clínica médica.',
            heroButtonText: 'Comece Agora',
            heroImage: '',
            features: [
                { title: 'Feature 1', description: 'Description 1', icon: 'icon1.png' },
                { title: 'Feature 2', description: 'Description 2', icon: 'icon2.png' },
                { title: 'Feature 3', description: 'Description 3', icon: 'icon3.png' },
            ],
        };
        (0, logger_1.default)('info', 'Conteúdo da homepage recuperado com sucesso.');
        res.status(200).send(content);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao recuperar conteúdo da homepage:', error);
        res.status(500).send({ error: 'Erro ao recuperar conteúdo da homepage.' });
    }
});
exports.getHomepageContent = getHomepageContent;
