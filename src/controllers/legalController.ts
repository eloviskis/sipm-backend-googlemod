import { Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';
import logger from '../middlewares/logger';

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET || 'your-bucket-name');

// Função para obter a política de privacidade
export const getPrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const file = bucket.file('privacy-policy.html');
        const [exists] = await file.exists();

        if (!exists) {
            logger('error', 'Arquivo de política de privacidade não encontrado');
            return res.status(404).send({ error: 'Arquivo não encontrado' });
        }

        res.setHeader('Content-Type', 'text/html');
        file.createReadStream().pipe(res);
    } catch (error) {
        logger('error', 'Erro ao obter a política de privacidade:', error);
        res.status(500).send({ error: 'Erro ao obter a política de privacidade' });
    }
};

// Função para obter os termos de serviço
export const getTermsOfService = async (req: Request, res: Response) => {
    try {
        const file = bucket.file('terms-of-service.html');
        const [exists] = await file.exists();

        if (!exists) {
            logger('error', 'Arquivo de termos de serviço não encontrado');
            return res.status(404).send({ error: 'Arquivo não encontrado' });
        }

        res.setHeader('Content-Type', 'text/html');
        file.createReadStream().pipe(res);
    } catch (error) {
        logger('error', 'Erro ao obter os termos de serviço:', error);
        res.status(500).send({ error: 'Erro ao obter os termos de serviço' });
    }
};
