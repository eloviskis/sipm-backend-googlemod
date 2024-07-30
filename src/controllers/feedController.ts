import { Request, Response } from 'express';
import FeedItem from '../models/feedItem'; // Certifique-se de criar o modelo FeedItem

// Função para obter itens do feed
export const getFeedItems = async (req: Request, res: Response) => {
    try {
        const feedItems = await FeedItem.find();
        res.status(200).send(feedItems);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao obter itens do feed' });
    }
};

// Função para criar um novo item do feed
export const createFeedItem = async (req: Request, res: Response) => {
    try {
        const feedItem = new FeedItem(req.body);
        await feedItem.save();
        res.status(201).send(feedItem);
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar item do feed' });
    }
};
