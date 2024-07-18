import { Request, Response } from 'express';
import { uploadFile } from '../services/googleDriveService';

export const uploadDocument = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send({ error: 'Nenhum arquivo enviado.' });
        }
        const result = await uploadFile(file);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
