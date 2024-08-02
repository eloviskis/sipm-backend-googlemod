import { Request, Response } from 'express';
import admin from 'firebase-admin';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const db = admin.firestore();
const accountsPayableCollection = db.collection('accountsPayable');

// Criar uma nova conta a pagar
export const createAccountPayable = async (req: Request, res: Response) => {
    try {
        const accountPayable = req.body;
        const docRef = await accountsPayableCollection.add(accountPayable);
        const savedAccount = await docRef.get();

        logger('info', `Conta a pagar criada: ${docRef.id}`); // Adicionando log de criação
        res.status(201).send({ id: docRef.id, ...savedAccount.data() });
    } catch (error) {
        logger('error', 'Erro ao criar conta a pagar:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Obter todas as contas a pagar
export const getAccountsPayable = async (req: Request, res: Response) => {
    try {
        const snapshot = await accountsPayableCollection.get();
        const accountsPayable = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(accountsPayable);
    } catch (error) {
        logger('error', 'Erro ao obter contas a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Obter uma conta a pagar específica
export const getAccountPayable = async (req: Request, res: Response) => {
    try {
        const doc = await accountsPayableCollection.doc(req.params.id).get();
        if (!doc.exists) {
            logger('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (error) {
        logger('error', 'Erro ao obter conta a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Atualizar uma conta a pagar
export const updateAccountPayable = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'amount'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const docRef = accountsPayableCollection.doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }

        const accountPayable = doc.data();
        updates.forEach((update) => (accountPayable![update as keyof typeof accountPayable] = req.body[update]));
        await docRef.update(accountPayable!);

        logger('info', `Conta a pagar atualizada: ${docRef.id}`); // Adicionando log de atualização
        res.send({ id: docRef.id, ...accountPayable });
    } catch (error) {
        logger('error', 'Erro ao atualizar conta a pagar:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Deletar uma conta a pagar
export const deleteAccountPayable = async (req: Request, res: Response) => {
    try {
        const docRef = accountsPayableCollection.doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        await docRef.delete();
        logger('info', `Conta a pagar deletada: ${req.params.id}`); // Adicionando log de deleção
        res.send({ id: docRef.id, ...doc.data() });
    } catch (error) {
        logger('error', 'Erro ao deletar conta a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
