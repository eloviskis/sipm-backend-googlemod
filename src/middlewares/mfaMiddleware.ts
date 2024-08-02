import { Request, Response, NextFunction } from 'express';
import speakeasy from 'speakeasy';
import admin from 'firebase-admin';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const db = admin.firestore();
const usersCollection = db.collection('users');

const mfaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        try {
            const userDoc = await usersCollection.doc(req.user._id).get();
            if (!userDoc.exists) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            const user = userDoc.data();
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
        } catch (error) {
            logger('error', 'Erro ao verificar MFA:', error);
            return res.status(500).send({ error: 'Erro interno do servidor' });
        }
    }

    next();
};

export default mfaMiddleware;
