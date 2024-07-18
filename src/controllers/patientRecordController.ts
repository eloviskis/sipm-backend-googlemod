import { Request, Response } from 'express';
import PatientRecord, { IPatientRecord } from '../models/patientRecord';

export const createPatientRecord = async (req: Request, res: Response) => {
    try {
        const patientRecord: IPatientRecord = new PatientRecord(req.body);
        const savedPatientRecord = await patientRecord.save();
        res.status(201).send(savedPatientRecord);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPatientRecords = async (req: Request, res: Response) => {
    try {
        const patientRecords = await PatientRecord.find({});
        res.send(patientRecords);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPatientRecord = async (req: Request, res: Response) => {
    try {
        const patientRecord = await PatientRecord.findById(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        res.send(patientRecord);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePatientRecord = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'medicalHistory', 'consultations', 'anamnese', 'prescriptions', 'insuranceHistory', 'payments', 'therapyDiary', 'documents', 'consentForms'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const patientRecord: IPatientRecord | null = await PatientRecord.findById(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in patientRecord) {
                (patientRecord as any)[update] = req.body[update];
            }
        });
        await patientRecord.save();
        res.send(patientRecord);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePatientRecord = async (req: Request, res: Response) => {
    try {
        const patientRecord = await PatientRecord.findByIdAndDelete(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        res.send(patientRecord);
    } catch (error) {
        res.status(500).send(error);
    }
};
