import { Request, Response } from 'express';
import Clinic, { IClinic } from '../models/clinic';

// Criar uma nova clínica
export const createClinic = async (req: Request, res: Response) => {
    try {
        const clinic: IClinic = new Clinic(req.body);
        const savedClinic = await clinic.save();
        res.status(201).send(savedClinic);
    } catch (error) {
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
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in clinic) {
                (clinic as any)[update] = req.body[update];
            }
        });
        await clinic.save();
        res.send(clinic);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Obter todas as clínicas
export const getClinics = async (req: Request, res: Response) => {
    try {
        const clinics = await Clinic.find({});
        res.send(clinics);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obter uma clínica específica
export const getClinic = async (req: Request, res: Response) => {
    try {
        const clinic = await Clinic.findById(req.params.id);
        if (!clinic) {
            return res.status(404).send();
        }
        res.send(clinic);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Deletar uma clínica
export const deleteClinic = async (req: Request, res: Response) => {
    try {
        const clinic = await Clinic.findByIdAndDelete(req.params.id);
        if (!clinic) {
            return res.status(404).send();
        }
        res.send(clinic);
    } catch (error) {
        res.status(500).send(error);
    }
};
