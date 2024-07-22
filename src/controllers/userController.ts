import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para criar um novo usuário com criptografia de senha
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, cnpj, cpf, financialResponsible, consent } = req.body;

        if (!consent) {
            return res.status(400).send({ error: 'O consentimento do usuário é obrigatório para o processamento de dados.' });
        }

        // Criptografar a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, role, cnpj, cpf, financialResponsible });
        await user.save();

        logger('info', `Usuário criado: ${user._id}`); // Adicionando log de criação de usuário
        res.status(201).send(user);
    } catch (error) {
        logger('error', 'Erro ao criar usuário:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Atualizar usuário com criptografia de senha
export const updateUser = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'role', 'cnpj', 'cpf', 'financialResponsible'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            logger('error', `Usuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        for (const update of updates) {
            if (update === 'password') {
                (user as any)[update] = await bcrypt.hash(req.body[update], 10); // Criptografar a nova senha
            } else {
                (user as any)[update] = req.body[update];
            }
        }
        await user.save();

        logger('info', `Usuário atualizado: ${user._id}`); // Adicionando log de atualização de usuário
        res.send(user);
    } catch (error) {
        logger('error', 'Erro ao atualizar usuário:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            logger('error', `Usuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }

        logger('info', `Usuário deletado: ${user._id}`); // Adicionando log de exclusão de usuário
        res.send({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        logger('error', 'Erro ao deletar usuário:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
