import { Request, Response } from 'express';
import Payment from '../models/payment';
import { processPayment, generateInvoice } from '../services/paymentService';
import logger from '../middlewares/logger'; // Certifique-se de que logger está correto

// Função para processar um pagamento
export const createPayment = async (req: Request, res: Response) => {
    try {
        const paymentDetails = req.body;
        const paymentResult = await processPayment(paymentDetails);

        if (paymentResult.success) {
            const payment = new Payment(paymentResult.data);
            await payment.save();
            const invoice = await generateInvoice(payment);

            console.info(`Pagamento processado: ${payment._id}`); // Uso correto do console.info
            res.status(201).send({ payment, invoice });
        } else {
            res.status(400).send({ error: paymentResult.error });
        }
    } catch (error) {
        console.error('Erro ao processar pagamento:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
};

// Função para obter todos os pagamentos
export const getPayments = async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find({});
        res.send(payments);
    } catch (error) {
        console.error('Erro ao obter pagamentos:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
};

// Função para obter um pagamento específico
export const getPayment = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    } catch (error) {
        console.error('Erro ao obter pagamento:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
};

// Função para deletar um pagamento
export const deletePayment = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }

        console.info(`Pagamento deletado: ${payment._id}`); // Uso correto do console.info
        res.send(payment);
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error); // Uso correto do console.error
        res.status(500).send(error);
    }
};
