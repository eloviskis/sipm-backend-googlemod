import { Request, Response } from 'express';
import Motivo, { IMotivo } from '../models/motivo';
import logger from '../middlewares/logger';

// Criar um novo motivo
export const createMotivo = async (req: Request, res: Response) => {
    try {
        const motivo = new Motivo(req.body);
        await motivo.save();
        logger('info', `Motivo criado: ${motivo._id}`);
        res.status(201).send(motivo);
    } catch (error) {
        logger('error', 'Erro ao criar motivo:', error);
        res.status(400).send(error);
    }
};

// Obter todos os motivos
export const getMotivos = async (req: Request, res: Response) => {
    try {
        const motivos = await Motivo.find({});
        res.send(motivos);
    } catch (error) {
        logger('error', 'Erro ao obter motivos:', error);
        res.status(500).send(error);
    }
};

// Obter um motivo específico
export const getMotivo = async (req: Request, res: Response) => {
    try {
        const motivo = await Motivo.findById(req.params.id);
        if (!motivo) {
            logger('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(motivo);
    } catch (error) {
        logger('error', 'Erro ao obter motivo:', error);
        res.status(500).send(error);
    }
};

// Atualizar um motivo específico (USANDO TYPE ASSERTION)
export const updateMotivo = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const motivo: IMotivo | null = await Motivo.findById(req.params.id);
        if (!motivo) {
            logger('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        updates.forEach((update) => {
            (motivo as any)[update] = req.body[update]; // Use Type Assertion
        });
        await motivo.save();
        logger('info', `Motivo atualizado: ${motivo._id}`);
        res.send(motivo);
    } catch (error) {
        logger('error', 'Erro ao atualizar motivo:', error);
        res.status(400).send(error);
    }
};

// Deletar um motivo específico
export const deleteMotivo = async (req: Request, res: Response) => {
    try {
        const motivo = await Motivo.findByIdAndDelete(req.params.id);
        if (!motivo) {
            logger('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        logger('info', `Motivo deletado: ${motivo._id}`);
        res.send(motivo);
    } catch (error) {
        logger('error', 'Erro ao deletar motivo:', error);
        res.status(500).send(error);
    }
};
