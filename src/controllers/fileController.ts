import { Request, Response } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export const uploadFile = (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Por favor, faça o upload de um arquivo' });
    }
    res.send({ message: 'Arquivo carregado com sucesso', file });
};

export const uploadMiddleware = upload.single('file');
