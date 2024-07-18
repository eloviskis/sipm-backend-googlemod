import { Request, Response } from 'express';
import Message, { IMessage } from '../models/message';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const message: IMessage = new Message(req.body);
        const savedMessage = await message.save();
        res.status(201).send(savedMessage);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ to: req.params.userId });
        res.send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
};
