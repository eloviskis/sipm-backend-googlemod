import { Request, Response, NextFunction } from 'express';
import speakeasy from 'speakeasy';
import User, { IUser } from '../models/user'; // Certifique-se de importar o modelo de usuário

const mfaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        const user: IUser | null = await User.findById((req.user as IUser)._id);
        if (user && user.mfaEnabled) {
            const token = req.header('x-mfa-token');
            if (!token) {
                return res.status(401).send({ error: 'Token MFA não fornecido' });
            }

            if (!user.mfaSecret) {
                return res.status(500).send({ error: 'Secret MFA não configurado' });
            }

            const verified = speakeasy.totp.verify({
                secret: user.mfaSecret,
                encoding: 'base32',
                token,
            });

            if (!verified) {
                return res.status(401).send({ error: 'Token MFA inválido' });
            }
        }
    }

    next();
};

export default mfaMiddleware;
