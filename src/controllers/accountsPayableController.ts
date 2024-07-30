import { Request, Response } from 'express';
import AccountsPayable from '../models/accountsPayable';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Criar uma nova conta a pagar
export const createAccountPayable = async (req: Request, res: Response) => {
    try {
        const accountPayable = new AccountsPayable(req.body);
        const savedAccount = await accountPayable.save();

        logger('info', `Conta a pagar criada: ${savedAccount._id}`); // Adicionando log de criação
        res.status(201).send(savedAccount);
    } catch (error) {
        logger('error', 'Erro ao criar conta a pagar:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Obter todas as contas a pagar
export const getAccountsPayable = async (req: Request, res: Response) => {
    try {
        const accountsPayable = await AccountsPayable.find({});
        res.send(accountsPayable);
    } catch (error) {
        logger('error', 'Erro ao obter contas a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Obter uma conta a pagar específica
export const getAccountPayable = async (req: Request, res: Response) => {
    try {
        const accountPayable = await AccountsPayable.findById(req.params.id);
        if (!accountPayable) {
            logger('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(accountPayable);
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
        const accountPayable: any = await AccountsPayable.findById(req.params.id);
        if (!accountPayable) {
            logger('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => (accountPayable[update as keyof typeof accountPayable] = req.body[update]));
        await accountPayable.save();

        logger('info', `Conta a pagar atualizada: ${accountPayable._id}`); // Adicionando log de atualização
        res.send(accountPayable);
    } catch (error) {
        logger('error', 'Erro ao atualizar conta a pagar:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Deletar uma conta a pagar
export const deleteAccountPayable = async (req: Request, res: Response) => {
    try {
        const accountPayable = await AccountsPayable.findByIdAndDelete(req.params.id);
        if (!accountPayable) {
            logger('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        logger('info', `Conta a pagar deletada: ${accountPayable._id}`); // Adicionando log de deleção
        res.send(accountPayable);
    } catch (error) {
        logger('error', 'Erro ao deletar conta a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
