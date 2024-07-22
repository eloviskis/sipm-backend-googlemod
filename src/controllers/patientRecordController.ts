import { Request, Response } from 'express';
import PatientRecord, { IPatientRecord } from '../models/patientRecord';
import logger from '../utils/logger'; // Corrigindo o caminho da importação
import { integrateWithLab, integrateWithMedicalDevices } from '../services/integrationService'; // Serviços de integração

// Função para criar um novo prontuário de paciente
export const createPatientRecord = async (req: Request, res: Response) => {
    try {
        const patientRecord: IPatientRecord = new PatientRecord(req.body);
        const savedPatientRecord = await patientRecord.save();

        // Integração com laboratórios e dispositivos médicos
        integrateWithLab(savedPatientRecord);
        integrateWithMedicalDevices(savedPatientRecord);

        logger.info(`Prontuário do paciente criado: ${savedPatientRecord._id}`); // Adicionando log de criação de prontuário
        res.status(201).send(savedPatientRecord);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Erro ao criar prontuário do paciente:', error); // Adicionando log de erro
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'Erro desconhecido' });
        }
    }
};

// Função para obter todos os prontuários de pacientes
export const getPatientRecords = async (req: Request, res: Response) => {
    try {
        const patientRecords = await PatientRecord.find({});
        res.send(patientRecords);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Erro ao obter prontuários de pacientes:', error); // Adicionando log de erro
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Erro desconhecido' });
        }
    }
};

// Função para obter um prontuário específico
export const getPatientRecord = async (req: Request, res: Response) => {
    try {
        const patientRecord = await PatientRecord.findById(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        res.send(patientRecord);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Erro ao obter prontuário do paciente:', error); // Adicionando log de erro
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Erro desconhecido' });
        }
    }
};

// Função para atualizar um prontuário de paciente
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

        logger.info(`Prontuário do paciente atualizado: ${patientRecord._id}`); // Adicionando log de atualização de prontuário
        res.send(patientRecord);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Erro ao atualizar prontuário do paciente:', error); // Adicionando log de erro
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'Erro desconhecido' });
        }
    }
};

// Função para deletar um prontuário de paciente
export const deletePatientRecord = async (req: Request, res: Response) => {
    try {
        const patientRecord = await PatientRecord.findByIdAndDelete(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }

        logger.info(`Prontuário do paciente deletado: ${patientRecord._id}`); // Adicionando log de exclusão de prontuário
        res.send(patientRecord);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Erro ao deletar prontuário do paciente:', error); // Adicionando log de erro
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Erro desconhecido' });
        }
    }
};
