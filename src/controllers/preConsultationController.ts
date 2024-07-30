import { Request, Response } from 'express';
import PreConsultation, { IPreConsultation } from '../models/preConsultation';
import logger from '../middlewares/logger';

// Criar uma nova pré-consulta
export const createPreConsultation = async (req: Request, res: Response) => {
    try {
        const preConsultation = new PreConsultation(req.body);
        await preConsultation.save();
        logger('info', `Pré-consulta criada: ${preConsultation._id}`);
        res.status(201).send(preConsultation);
    } catch (error) {
        logger('error', 'Erro ao criar pré-consulta:', error);
        res.status(400).send(error);
    }
};

// Obter todas as pré-consultas
export const getPreConsultations = async (req: Request, res: Response) => {
    try {
        const preConsultations = await PreConsultation.find({});
        res.send(preConsultations);
    } catch (error) {
        logger('error', 'Erro ao obter pré-consultas:', error);
        res.status(500).send(error);
    }
};

// Obter uma pré-consulta específica
export const getPreConsultation = async (req: Request, res: Response) => {
    try {
        const preConsultation = await PreConsultation.findById(req.params.id);
        if (!preConsultation) {
            logger('error', `Pré-consulta não encontrada: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(preConsultation);
    } catch (error) {
        logger('error', 'Erro ao obter pré-consulta:', error);
        res.status(500).send(error);
    }
};

// Atualizar uma pré-consulta específica (USANDO TYPE ASSERTION)
export const updatePreConsultation = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'details'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const preConsultation: IPreConsultation | null = await PreConsultation.findById(req.params.id);
        if (!preConsultation) {
            logger('error', `Pré-consulta não encontrada: ${req.params.id}`);
            return res.status(404).send();
        }
        updates.forEach((update) => {
            (preConsultation as any)[update] = req.body[update]; // Use Type Assertion
        });
        await preConsultation.save();
        logger('info', `Pré-consulta atualizada: ${preConsultation._id}`);
        res.send(preConsultation);
    } catch (error) {
        logger('error', 'Erro ao atualizar pré-consulta:', error);
        res.status(400).send(error);
    }
};

// Deletar uma pré-consulta específica
export const deletePreConsultation = async (req: Request, res: Response) => {
    try {
        const preConsultation = await PreConsultation.findByIdAndDelete(req.params.id);
        if (!preConsultation) {
            logger('error', `Pré-consulta não encontrada: ${req.params.id}`);
            return res.status(404).send();
        }
        logger('info', `Pré-consulta deletada: ${preConsultation._id}`);
        res.send(preConsultation);
    } catch (error) {
        logger('error', 'Erro ao deletar pré-consulta:', error);
        res.status(500).send(error);
    }
};
