import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single('file');

// Função para fazer upload de um arquivo
export const uploadFile = (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        logger('error', 'Nenhum arquivo enviado'); // Adicionando log de erro
        return res.status(400).send({ message: 'Por favor, faça o upload de um arquivo' });
    }
    logger('info', `Arquivo carregado: ${file.filename}`); // Adicionando log de sucesso
    res.send({ message: 'Arquivo carregado com sucesso', file });
};

// Função para fazer download de um arquivo
export const downloadFile = (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    if (!fs.existsSync(filePath)) {
        logger('error', `Arquivo não encontrado: ${fileName}`); // Adicionando log de erro
        return res.status(404).send({ message: 'Arquivo não encontrado' });
    }

    logger('info', `Arquivo baixado: ${fileName}`); // Adicionando log de sucesso
    res.download(filePath);
};

// Função para deletar um arquivo
export const deleteFile = (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    if (!fs.existsSync(filePath)) {
        logger('error', `Arquivo não encontrado para deletar: ${fileName}`); // Adicionando log de erro
        return res.status(404).send({ message: 'Arquivo não encontrado' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            logger('error', `Erro ao deletar arquivo: ${err.message}`); // Adicionando log de erro
            return res.status(500).send({ message: 'Erro ao deletar arquivo' });
        }

        logger('info', `Arquivo deletado: ${fileName}`); // Adicionando log de sucesso
        res.send({ message: 'Arquivo deletado com sucesso' });
    });
};
