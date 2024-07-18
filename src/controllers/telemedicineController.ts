import { Request, Response } from 'express';
import { generateVideoToken, createVideoRoom } from '../services/telemedicineService';

export const createRoom = async (req: Request, res: Response) => {
    try {
        const room = await createVideoRoom(req.body.roomName);
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getToken = (req: Request, res: Response) => {
    try {
        const token = generateVideoToken(req.body.identity);
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
};
