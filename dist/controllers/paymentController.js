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
exports.deletePayment = exports.getPayment = exports.getPayments = exports.createPayment = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const paymentService_1 = require("../services/paymentService");
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const paymentsCollection = db.collection('payments');
// Função para validar detalhes do pagamento
const validatePaymentDetails = (paymentDetails) => {
    if (!paymentDetails.amount || typeof paymentDetails.amount !== 'number') {
        throw new Error('O valor do pagamento é obrigatório e deve ser um número.');
    }
    if (!paymentDetails.method || typeof paymentDetails.method !== 'string') {
        throw new Error('O método de pagamento é obrigatório e deve ser uma string.');
    }
    // Adicione outras validações necessárias
};
// Função para processar um pagamento
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentDetails = req.body;
        // Validação dos detalhes do pagamento
        validatePaymentDetails(paymentDetails);
        const paymentResult = yield (0, paymentService_1.processPayment)(paymentDetails);
        if (paymentResult.success) {
            const payment = paymentResult.data;
            const docRef = yield paymentsCollection.add(payment);
            const savedPayment = yield docRef.get();
            const invoice = yield (0, paymentService_1.generateInvoice)(savedPayment.data());
            (0, logger_1.default)('info', `Pagamento processado: ${docRef.id}`);
            res.status(201).send({ payment: Object.assign({ id: docRef.id }, savedPayment.data()), invoice });
        }
        else {
            (0, logger_1.default)('error', `Erro ao processar pagamento: ${paymentResult.error}`);
            res.status(400).send({ error: paymentResult.error });
        }
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao processar pagamento: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.createPayment = createPayment;
// Função para obter todos os pagamentos
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield paymentsCollection.get();
        const payments = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(payments);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter pagamentos: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getPayments = getPayments;
// Função para obter um pagamento específico
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield paymentsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Pagamento não encontrado: ${req.params.id}`);
            return res.status(404).send({ error: 'Pagamento não encontrado' });
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter pagamento: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getPayment = getPayment;
// Função para deletar um pagamento
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = paymentsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Pagamento não encontrado: ${req.params.id}`);
            return res.status(404).send({ error: 'Pagamento não encontrado' });
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Pagamento deletado: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao deletar pagamento: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.deletePayment = deletePayment;
