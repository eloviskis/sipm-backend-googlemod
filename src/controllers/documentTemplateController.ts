import { Request, Response } from 'express';
import DocumentTemplate, { IDocumentTemplate } from '../models/documentTemplate';
import logger from '../middlewares/logger';

// Criar um novo modelo de documento
export const createDocumentTemplate = async (req: Request, res: Response) => {
    try {
        const template = new DocumentTemplate(req.body);
        await template.save();
        logger('info', `Modelo de documento criado: ${template._id}`);
        res.status(201).send(template);
    } catch (error) {
        logger('error', 'Erro ao criar modelo de documento:', error);
        res.status(400).send(error);
    }
};

// Obter todos os modelos de documentos
export const getDocumentTemplates = async (req: Request, res: Response) => {
    try {
        const templates = await DocumentTemplate.find({});
        res.send(templates);
    } catch (error) {
        logger('error', 'Erro ao obter modelos de documentos:', error);
        res.status(500).send(error);
    }
};

// Obter um modelo de documento específico
export const getDocumentTemplate = async (req: Request, res: Response) => {
    try {
        const template = await DocumentTemplate.findById(req.params.id);
        if (!template) {
            logger('error', `Modelo de documento não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(template);
    } catch (error) {
        logger('error', 'Erro ao obter modelo de documento:', error);
        res.status(500).send(error);
    }
};

// Atualizar um modelo de documento específico (USANDO TYPE ASSERTION)
export const updateDocumentTemplate = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const template: IDocumentTemplate | null = await DocumentTemplate.findById(req.params.id);
        if (!template) {
            logger('error', `Modelo de documento não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        updates.forEach((update) => {
            (template as any)[update] = req.body[update]; // Use Type Assertion
        });
        await template.save();
        logger('info', `Modelo de documento atualizado: ${template._id}`);
        res.send(template);
    } catch (error) {
        logger('error', 'Erro ao atualizar modelo de documento:', error);
        res.status(400).send(error);
    }
};

// Deletar um modelo de documento específico
export const deleteDocumentTemplate = async (req: Request, res: Response) => {
    try {
        const template = await DocumentTemplate.findByIdAndDelete(req.params.id);
        if (!template) {
            logger('error', `Modelo de documento não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        logger('info', `Modelo de documento deletado: ${template._id}`);
        res.send(template);
    } catch (error) {
        logger('error', 'Erro ao deletar modelo de documento:', error);
        res.status(500).send(error);
    }
};
