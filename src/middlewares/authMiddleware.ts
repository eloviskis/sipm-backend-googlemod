import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import logger from '../middlewares/logger';
import { IUser } from '../models/user'; // Usando a interface IUser exportada

declare global {
    namespace Express {
        interface User extends IUser {
            _id: string;
        }
    }
}

interface AuthenticatedRequest extends Request {
    user?: Express.User;
}

// Inicializar Firebase Admin SDK (certifique-se de que está configurado corretamente)
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

// Middleware de autenticação existente
export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = await admin.auth().getUser(decodedToken.uid);

        req.user = {
            _id: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            permissions: (user.customClaims && user.customClaims.permissions) || []
        } as Express.User;

        next();
    } catch (err) {
        logger('error', 'Erro ao verificar token de autenticação:', err);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Novo middleware de permissão
export const permissionMiddleware = (permission: string) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        // Verifica se o usuário autenticado possui a permissão necessária
        if (req.user && req.user.permissions.includes(permission)) {
            next(); // Se possuir a permissão, continue
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' }); // Caso contrário, retorne erro 403
        }
    };
};
