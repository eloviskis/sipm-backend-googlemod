import { Request, Response, NextFunction } from 'express';
import { Logging } from '@google-cloud/logging';
import logger from './logger'; // Adicionando middleware de logger

const logging = new Logging();
const log = logging.log('errors');

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
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

    // Enviar log para Google Cloud Logging
    const metadata = {
        resource: { type: 'global' },
    };

    const entry = log.entry(metadata, {
        severity: 'ERROR',
        message,
        statusCode,
        path: req.path,
        method: req.method,
        ip: req.ip,
        errors,
    });

    await log.write(entry);

    res.status(statusCode).json({
        message,
        errors,
    });
};
