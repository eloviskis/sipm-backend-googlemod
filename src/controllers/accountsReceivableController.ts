import { Request, Response } from 'express';
import AccountsReceivable from '../models/accountsReceivable'; // Update the path to the correct module
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Criar uma nova conta a receber
export const createAccountReceivable = async (req: Request, res: Response) => {
    try {
        const accountReceivable = new AccountsReceivable(req.body);
        const savedAccount = await accountReceivable.save();

        logger('info', `Conta a receber criada: ${savedAccount._id}`); // Adicionando log de criação
        res.status(201).send(savedAccount);
    } catch (error) {
        logger('error', 'Erro ao criar conta a receber:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Obter todas as contas a receber
export const getAccountsReceivable = async (req: Request, res: Response) => {
    try {
        const accountsReceivable = await AccountsReceivable.find({});
        res.send(accountsReceivable);
    } catch (error) {
        logger('error', 'Erro ao obter contas a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Obter uma conta a receber específica
export const getAccountReceivable = async (req: Request, res: Response) => {
    try {
        const accountReceivable = await AccountsReceivable.findById(req.params.id);
        if (!accountReceivable) {
            logger('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(accountReceivable);
    } catch (error) {
        logger('error', 'Erro ao obter conta a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Atualizar uma conta a receber
export const updateAccountReceivable = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'amount'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const accountReceivable: any = await AccountsReceivable.findById(req.params.id);
        if (!accountReceivable) {
            logger('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => (accountReceivable[update as keyof typeof accountReceivable] = req.body[update]));
        await accountReceivable.save();

        logger('info', `Conta a receber atualizada: ${accountReceivable._id}`); // Adicionando log de atualização
        res.send(accountReceivable);
    } catch (error) {
        logger('error', 'Erro ao atualizar conta a receber:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Deletar uma conta a receber
export const deleteAccountReceivable = async (req: Request, res: Response) => {
    try {
        const accountReceivable = await AccountsReceivable.findByIdAndDelete(req.params.id);
        if (!accountReceivable) {
            logger('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        logger('info', `Conta a receber deletada: ${accountReceivable._id}`); // Adicionando log de deleção
        res.send(accountReceivable);
    } catch (error) {
        logger('error', 'Erro ao deletar conta a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
