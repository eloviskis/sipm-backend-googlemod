import { Request, Response, NextFunction } from 'express';
import logger from './logger'; // Adicionando middleware de logger

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';
    const errors = err.errors || null;

    // Adicionando log detalhado de erro
    logger('error', `Erro: ${message}`, {
        statusCode,
        path: req.path,
        method: req.method,
        ip: req.ip,
        errors,
    });

    res.status(statusCode).json({
        message,
        errors,
    });
};
