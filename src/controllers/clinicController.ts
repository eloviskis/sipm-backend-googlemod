import { Request, Response } from 'express';
import Clinic, { IClinic } from '../models/clinic';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Criar uma nova clínica
export const createClinic = async (req: Request, res: Response) => {
    try {
        const clinic: IClinic = new Clinic(req.body);
        const savedClinic = await clinic.save();

        logger('info', `Clínica criada: ${savedClinic._id}`); // Adicionando log de criação de clínica
        res.status(201).send(savedClinic);
    } catch (error) {
        logger('error', 'Erro ao criar clínica:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Atualizar uma clínica
export const updateClinic = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'financialResponsible', 'customization'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const clinic: IClinic | null = await Clinic.findById(req.params.id);
        if (!clinic) {
            logger('error', `Clínica não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in clinic) {
                (clinic as any)[update] = req.body[update];
            }
        });
        await clinic.save();
        logger('info', `Clínica atualizada: ${clinic._id}`); // Adicionando log de atualização de clínica
        res.send(clinic);
    } catch (error) {
        logger('error', 'Erro ao atualizar clínica:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Obter todas as clínicas
export const getClinics = async (req: Request, res: Response) => {
    try {
        const clinics = await Clinic.find({});
        res.send(clinics);
    } catch (error) {
        logger('error', 'Erro ao obter clínicas:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Obter uma clínica específica
export const getClinic = async (req: Request, res: Response) => {
    try {
        const clinic = await Clinic.findById(req.params.id);
        if (!clinic) {
            logger('error', `Clínica não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(clinic);
    } catch (error) {
        logger('error', 'Erro ao obter clínica:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Deletar uma clínica
export const deleteClinic = async (req: Request, res: Response) => {
    try {
        const clinic = await Clinic.findByIdAndDelete(req.params.id);
        if (!clinic) {
            logger('error', `Clínica não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        logger('info', `Clínica deletada: ${clinic._id}`); // Adicionando log de deleção de clínica
        res.send(clinic);
    } catch (error) {
        logger('error', 'Erro ao deletar clínica:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
