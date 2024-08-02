import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { processPayment, generateInvoice } from '../services/paymentService';
import logger from '../middlewares/logger'; // Certifique-se de que logger está correto

const db = admin.firestore();
const paymentsCollection = db.collection('payments');

// Função para processar um pagamento
export const createPayment = async (req: Request, res: Response) => {
    try {
        const paymentDetails = req.body;
        const paymentResult = await processPayment(paymentDetails);

        if (paymentResult.success) {
            const payment = paymentResult.data;
            const docRef = await paymentsCollection.add(payment);
            const savedPayment = await docRef.get();
            const invoice = await generateInvoice(savedPayment.data());

            logger.info(`Pagamento processado: ${docRef.id}`);
            res.status(201).send({ payment: { id: docRef.id, ...savedPayment.data() }, invoice });
        } else {
            res.status(400).send({ error: paymentResult.error });
        }
    } catch (error) {
        logger.error('Erro ao processar pagamento:', error);
        res.status(500).send(error);
    }
};

// Função para obter todos os pagamentos
export const getPayments = async (req: Request, res: Response) => {
    try {
        const snapshot = await paymentsCollection.get();
        const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(payments);
    } catch (error) {
        logger.error('Erro ao obter pagamentos:', error);
        res.status(500).send(error);
    }
};

// Função para obter um pagamento específico
export const getPayment = async (req: Request, res: Response) => {
    try {
        const doc = await paymentsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send();
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (error) {
        logger.error('Erro ao obter pagamento:', error);
        res.status(500).send(error);
    }
};

// Função para deletar um pagamento
export const deletePayment = async (req: Request, res: Response) => {
    try {
        const docRef = paymentsCollection.doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).send();
        }
        await docRef.delete();

        logger.info(`Pagamento deletado: ${docRef.id}`);
        res.send({ id: docRef.id, ...doc.data() });
    } catch (error) {
        logger.error('Erro ao deletar pagamento:', error);
        res.status(500).send(error);
    }
};
