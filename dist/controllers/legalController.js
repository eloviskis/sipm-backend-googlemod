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
exports.getTermsOfService = exports.getPrivacyPolicy = void 0;
const storage_1 = require("@google-cloud/storage");
const logger_1 = __importDefault(require("../middlewares/logger"));
const storage = new storage_1.Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET || 'your-bucket-name');
// Função para obter a política de privacidade
const getPrivacyPolicy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = bucket.file('privacy-policy.html');
        const [exists] = yield file.exists();
        if (!exists) {
            (0, logger_1.default)('error', 'Arquivo de política de privacidade não encontrado');
            return res.status(404).send({ error: 'Arquivo não encontrado' });
        }
        res.setHeader('Content-Type', 'text/html');
        file.createReadStream().on('error', (err) => {
            (0, logger_1.default)('error', `Erro ao ler o arquivo de política de privacidade: ${err.message}`);
            res.status(500).send({ error: 'Erro ao ler o arquivo de política de privacidade' });
        }).pipe(res);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter a política de privacidade: ${error.message}`);
        res.status(500).send({ error: 'Erro ao obter a política de privacidade' });
    }
});
exports.getPrivacyPolicy = getPrivacyPolicy;
// Função para obter os termos de serviço
const getTermsOfService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = bucket.file('terms-of-service.html');
        const [exists] = yield file.exists();
        if (!exists) {
            (0, logger_1.default)('error', 'Arquivo de termos de serviço não encontrado');
            return res.status(404).send({ error: 'Arquivo não encontrado' });
        }
        res.setHeader('Content-Type', 'text/html');
        file.createReadStream().on('error', (err) => {
            (0, logger_1.default)('error', `Erro ao ler o arquivo de termos de serviço: ${err.message}`);
            res.status(500).send({ error: 'Erro ao ler o arquivo de termos de serviço' });
        }).pipe(res);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter os termos de serviço: ${error.message}`);
        res.status(500).send({ error: 'Erro ao obter os termos de serviço' });
    }
});
exports.getTermsOfService = getTermsOfService;
