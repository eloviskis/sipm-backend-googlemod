import { Request, Response } from 'express';
import Page from '../models/page';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para criar uma nova página
export const createPage = async (req: Request, res: Response) => {
    try {
        const page = new Page(req.body);
        await page.save();

        logger('info', `Página criada: ${page._id}`); // Adicionando log de criação de página
        res.status(201).send(page);
    } catch (error) {
        logger('error', 'Erro ao criar página:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para obter todas as páginas
export const getPages = async (req: Request, res: Response) => {
    try {
        const pages = await Page.find({});
        res.send(pages);
    } catch (error) {
        logger('error', 'Erro ao obter páginas:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para obter uma página específica
export const getPage = async (req: Request, res: Response) => {
    try {
        const page = await Page.findById(req.params.id);
        if (!page) {
            logger('error', `Página não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(page);
    } catch (error) {
        logger('error', 'Erro ao obter página:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para atualizar uma página específica
export const updatePage = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const page = await Page.findById(req.params.id);
        if (!page) {
            logger('error', `Página não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => page.set(update, req.body[update]));
        await page.save();
        logger('info', `Página atualizada: ${page._id}`); // Adicionando log de atualização de página
        res.send(page);
    } catch (error) {
        logger('error', 'Erro ao atualizar página:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para deletar uma página específica
export const deletePage = async (req: Request, res: Response) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            logger('error', `Página não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        logger('info', `Página deletada: ${page._id}`); // Adicionando log de deleção de página
        res.send(page);
    } catch (error) {
        logger('error', 'Erro ao deletar página:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
