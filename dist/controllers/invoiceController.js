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
exports.createInvoice = void 0;
const pdfService_1 = require("../services/pdfService");
const invoiceNotificationService_1 = require("../services/invoiceNotificationService");
const logger_1 = __importDefault(require("../middlewares/logger"));
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceData = req.body;
        // Verificar se req.user está definido e possui a propriedade email
        if (!req.user || !req.user.email) {
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }
        // Gerar a fatura em PDF e obter o caminho do arquivo
        const invoicePath = yield (0, pdfService_1.generateInvoice)(invoiceData);
        // Enviar a fatura por e-mail
        yield (0, invoiceNotificationService_1.sendInvoiceEmail)(req.user.email, invoicePath);
        (0, logger_1.default)('info', `Fatura gerada e enviada: ${invoicePath}`);
        res.status(201).send({ message: 'Fatura gerada e enviada com sucesso' });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, logger_1.default)('error', `Erro ao criar fatura: ${error.message}`, error);
            res.status(500).send({ error: 'Erro ao criar fatura', details: error.message });
        }
        else {
            (0, logger_1.default)('error', 'Erro ao criar fatura:', error);
            res.status(500).send({ error: 'Erro ao criar fatura', details: 'Erro desconhecido' });
        }
    }
});
exports.createInvoice = createInvoice;
