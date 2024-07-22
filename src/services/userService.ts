import User, { IUser } from '../models/user';
import bcrypt from 'bcryptjs';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para criar um novo usuário
export const createUser = async (userData: Partial<IUser>) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const user = new User({ ...userData, password: hashedPassword });
        const savedUser = await user.save();

        logger('info', `Usuário criado: ${savedUser._id}`); // Adicionando log de criação de usuário
        return savedUser;
    } catch (error: any) {
        logger('error', `Erro ao criar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
};

// Função para atualizar um usuário
export const updateUser = async (userId: string, updates: Partial<IUser>) => {
    try {
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!user) {
            logger('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            throw new Error('Usuário não encontrado');
        }

        logger('info', `Usuário atualizado: ${user._id}`); // Adicionando log de atualização de usuário
        return user;
    } catch (error: any) {
        logger('error', `Erro ao atualizar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
};

// Função para deletar um usuário
export const deleteUser = async (userId: string) => {
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            logger('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            throw new Error('Usuário não encontrado');
        }

        logger('info', `Usuário deletado: ${user._id}`); // Adicionando log de deleção de usuário
        return user;
    } catch (error: any) {
        logger('error', `Erro ao deletar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
};

// Função para buscar um usuário por ID
export const getUserById = async (userId: string) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            logger('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            throw new Error('Usuário não encontrado');
        }

        logger('info', `Usuário encontrado: ${user._id}`); // Adicionando log de busca de usuário
        return user;
    } catch (error: any) {
        logger('error', `Erro ao buscar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
};
