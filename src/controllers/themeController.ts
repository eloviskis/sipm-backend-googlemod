import { Request, Response } from 'express';
import Theme, { ITheme } from '../models/theme';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para criar um novo tema
export const createTheme = async (req: Request, res: Response) => {
    try {
        const theme: ITheme = new Theme(req.body);
        const savedTheme = await theme.save();

        logger('info', `Tema criado: ${savedTheme._id}`); // Adicionando log de criação de tema
        res.status(201).send(savedTheme);
    } catch (error) {
        logger('error', 'Erro ao criar tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para obter todos os temas
export const getThemes = async (req: Request, res: Response) => {
    try {
        const themes = await Theme.find({});
        res.send(themes);
    } catch (error) {
        logger('error', 'Erro ao obter temas:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para obter um tema específico
export const getTheme = async (req: Request, res: Response) => {
    try {
        const theme = await Theme.findById(req.params.id);
        if (!theme) {
            logger('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(theme);
    } catch (error) {
        logger('error', 'Erro ao obter tema:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para atualizar um tema específico
export const updateTheme = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'layout', 'colors'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const theme: ITheme | null = await Theme.findById(req.params.id);
        if (!theme) {
            logger('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in theme) {
                (theme as any)[update] = req.body[update];
            }
        });
        await theme.save();
        logger('info', `Tema atualizado: ${theme._id}`); // Adicionando log de atualização de tema
        res.send(theme);
    } catch (error) {
        logger('error', 'Erro ao atualizar tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para deletar um tema específico
export const deleteTheme = async (req: Request, res: Response) => {
    try {
        const theme = await Theme.findByIdAndDelete(req.params.id);
        if (!theme) {
            logger('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        logger('info', `Tema deletado: ${theme._id}`); // Adicionando log de deleção de tema
        res.send(theme);
    } catch (error) {
        logger('error', 'Erro ao deletar tema:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
