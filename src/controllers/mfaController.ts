import { Request, Response } from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import admin from 'firebase-admin';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const db = admin.firestore();
const usersCollection = db.collection('users');

// Função para configurar MFA
export const configureMFA = async (req: Request, res: Response) => {
    try {
        const secret = speakeasy.generateSecret({ length: 20 });

        if (!secret.otpauth_url) {
            logger('error', 'Erro ao gerar o URL OTP Auth'); // Adicionando log de erro
            return res.status(500).send({ error: 'Erro ao gerar o URL OTP Auth' });
        }

        const userId = req.user?.uid; // Assumindo que o ID do usuário está disponível em req.user
        if (!userId) {
            logger('error', 'Usuário não autenticado'); // Adicionando log de erro
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }

        // Salvar a chave MFA no Firestore
        await usersCollection.doc(userId).update({ mfaSecret: secret.base32 });

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                logger('error', `Erro ao gerar QR Code: ${err.message}`); // Adicionando log de erro
                return res.status(500).send({ error: 'Erro ao gerar QR Code' });
            }

            logger('info', `MFA configurado para o usuário: ${userId}`); // Adicionando log de sucesso
            res.send({ secret: secret.base32, qrCode: data_url });
        });
    } catch (error: any) {
        logger('error', `Erro ao configurar MFA: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: 'Erro ao configurar MFA' });
    }
};

// Função para verificar MFA
export const verifyMFA = async (req: Request, res: Response) => {
    const { token, userId } = req.body;

    try {
        if (!token || !userId) {
            logger('error', 'Token ou ID do usuário não fornecido'); // Adicionando log de erro
            return res.status(400).send({ error: 'Token e ID do usuário são obrigatórios' });
        }

        // Recuperar o segredo MFA do Firestore
        const userDoc = await usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            logger('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        const user = userDoc.data();
        const secret = user?.mfaSecret;

        if (!secret) {
            logger('error', `MFA não configurado para o usuário: ${userId}`); // Adicionando log de erro
            return res.status(400).send({ error: 'MFA não configurado para este usuário' });
        }

        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
        });

        if (verified) {
            logger('info', `MFA verificado com sucesso para o usuário: ${userId}`); // Adicionando log de sucesso
            res.send({ message: 'MFA verificado com sucesso' });
        } else {
            logger('error', `Código MFA inválido para o usuário: ${userId}`); // Adicionando log de erro
            res.status(400).send({ error: 'Código MFA inválido' });
        }
    } catch (error: any) {
        logger('error', `Erro ao verificar MFA: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: 'Erro ao verificar MFA' });
    }
};
