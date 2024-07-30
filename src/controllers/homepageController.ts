import { Request, Response } from 'express';
import logger from '../middlewares/logger';

export const getHomepageContent = async (req: Request, res: Response) => {
    try {
        const content = {
            heroTitle: 'Bem-vindo ao SIPM',
            heroSubtitle: 'O Sistema Integrado de Prontuário Médico (SIPM) facilita a gestão de sua clínica médica.',
            heroButtonText: 'Comece Agora',
            heroImage: '', // URL da imagem
            features: [
                { title: 'Feature 1', description: 'Description 1', icon: 'icon1.png' },
                { title: 'Feature 2', description: 'Description 2', icon: 'icon2.png' },
                { title: 'Feature 3', description: 'Description 3', icon: 'icon3.png' },
            ],
        };
        
        logger('info', 'Conteúdo da homepage recuperado com sucesso.');
        res.status(200).send(content);
    } catch (error) {
        logger('error', 'Erro ao recuperar conteúdo da homepage:', error);
        res.status(500).send({ error: 'Erro ao recuperar conteúdo da homepage.' });
    }
};
