import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
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

// Middleware de autenticação existente
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error | null, user: Express.User | false, info: any) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    })(req, res, next);
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
