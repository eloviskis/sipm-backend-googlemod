import { Request, Response } from 'express';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        // Simulação de dados para o painel
        const data = [
            { id: 1, title: 'Usuários Registrados', description: 'Total de 1500 usuários' },
            { id: 2, title: 'Relatórios Gerados', description: 'Total de 300 relatórios' },
            { id: 3, title: 'Consultas Agendadas', description: 'Total de 200 consultas' },
        ];

        logger('info', 'Dados do painel obtidos com sucesso');
        res.status(200).send(data);
    } catch (error) {
        logger('error', 'Erro ao obter dados do painel:', error);
        res.status(500).send({ error: 'Erro ao obter dados do painel' });
    }
};
