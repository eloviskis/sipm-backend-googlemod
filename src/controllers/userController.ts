import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';

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
        res.status(201).send(user);
    } catch (error) {
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
            return res.status(404).send();
        }
        updates.forEach(async (update) => {
            if (update === 'password') {
                (user as any)[update] = await bcrypt.hash(req.body[update], 10); // Criptografar a nova senha
            } else {
                (user as any)[update] = req.body[update];
            }
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Função para deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(500).send(error);
    }
};
