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
const payment_1 = __importDefault(require("../models/payment"));
const paymentService_1 = require("../services/paymentService");
// Função para processar um pagamento
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentDetails = req.body;
        const paymentResult = yield (0, paymentService_1.processPayment)(paymentDetails);
        if (paymentResult.success) {
            const payment = new payment_1.default(paymentResult.data);
            yield payment.save();
            const invoice = yield (0, paymentService_1.generateInvoice)(payment);
            console.info(`Pagamento processado: ${payment._id}`); // Uso correto do console.info
            res.status(201).send({ payment, invoice });
        }
        else {
            res.status(400).send({ error: paymentResult.error });
        }
    }
    catch (error) {
        console.error('Erro ao processar pagamento:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
});
exports.createPayment = createPayment;
// Função para obter todos os pagamentos
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payment_1.default.find({});
        res.send(payments);
    }
    catch (error) {
        console.error('Erro ao obter pagamentos:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
});
exports.getPayments = getPayments;
// Função para obter um pagamento específico
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield payment_1.default.findById(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    }
    catch (error) {
        console.error('Erro ao obter pagamento:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
});
exports.getPayment = getPayment;
// Função para deletar um pagamento
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield payment_1.default.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        console.info(`Pagamento deletado: ${payment._id}`); // Uso correto do console.info
        res.send(payment);
    }
    catch (error) {
        console.error('Erro ao deletar pagamento:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
});
exports.deletePayment = deletePayment;
