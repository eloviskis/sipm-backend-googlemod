import { Request, Response } from 'express';
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const db = admin.firestore();
const usersCollection = db.collection('users');

// Função para criar um novo usuário com criptografia de senha
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, cnpj, cpf, financialResponsible, consent } = req.body;

        if (!consent) {
            return res.status(400).send({ error: 'O consentimento do usuário é obrigatório para o processamento de dados.' });
        }

        if (!email || !password || !name) {
            return res.status(400).send({ error: 'Nome, email e senha são obrigatórios.' });
        }

        // Validar o formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: 'Email inválido.' });
        }

        // Criptografar a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { name, email, password: hashedPassword, role, cnpj, cpf, financialResponsible };
        const docRef = await usersCollection.add(user);
        const savedUser = await docRef.get();

        logger('info', `Usuário criado: ${docRef.id}`); // Adicionando log de criação de usuário
        res.status(201).send({ id: docRef.id, ...savedUser.data() });
    } catch (error) {
        logger('error', 'Erro ao criar usuário:', error); // Adicionando log de erro
        res.status(400).send({ error: 'Erro ao criar usuário. Verifique os dados fornecidos.' });
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
        const docRef = usersCollection.doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger('error', `Usuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }

        const user = doc.data();
        for (const update of updates) {
            if (update === 'password') {
                (user as any)[update] = await bcrypt.hash(req.body[update], 10); // Criptografar a nova senha
            } else {
                (user as any)[update] = req.body[update];
            }
        }
        await docRef.update(user!);

        logger('info', `Usuário atualizado: ${req.params.id}`); // Adicionando log de atualização de usuário
        res.send({ id: docRef.id, ...user });
    } catch (error) {
        logger('error', 'Erro ao atualizar usuário:', error); // Adicionando log de erro
        res.status(400).send({ error: 'Erro ao atualizar usuário. Verifique os dados fornecidos.' });
    }
};

// Função para deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const docRef = usersCollection.doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger('error', `Usuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }
        await docRef.delete();

        logger('info', `Usuário deletado: ${req.params.id}`); // Adicionando log de exclusão de usuário
        res.send({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        logger('error', 'Erro ao deletar usuário:', error); // Adicionando log de erro
        res.status(500).send({ error: 'Erro ao deletar usuário. Tente novamente mais tarde.' });
    }
};
