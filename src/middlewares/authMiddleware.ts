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

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error | null, user: Express.User | false, info: any) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    })(req, res, next);
};
