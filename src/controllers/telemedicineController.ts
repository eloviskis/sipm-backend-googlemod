import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { generateVideoToken, createVideoRoom } from '../services/telemedicineService';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const db = admin.firestore();
const videoRoomsCollection = db.collection('videoRooms');

// Função para criar uma nova sala de videoconferência
export const createRoom = async (req: Request, res: Response) => {
    try {
        const room = await createVideoRoom(req.body.roomName);

        // Salvar metadados da sala de videoconferência no Firestore
        const roomData = {
            roomName: req.body.roomName,
            sid: room.sid,
            dateCreated: admin.firestore.FieldValue.serverTimestamp(),
        };
        const docRef = await videoRoomsCollection.add(roomData);
        const savedRoom = await docRef.get();

        logger('info', `Sala de videoconferência criada: ${room.sid}`); // Adicionando log de criação de sala
        res.status(201).send({ id: docRef.id, ...savedRoom.data() });
    } catch (error) {
        logger('error', 'Erro ao criar sala de videoconferência:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para gerar um token de vídeo
export const getToken = (req: Request, res: Response) => {
    try {
        const token = generateVideoToken(req.body.identity);
        logger('info', `Token de vídeo gerado para: ${req.body.identity}`); // Adicionando log de geração de token
        res.send({ token });
    } catch (error) {
        logger('error', 'Erro ao gerar token de vídeo:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};
