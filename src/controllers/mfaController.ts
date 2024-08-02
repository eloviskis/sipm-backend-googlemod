import { Request, Response } from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import admin from 'firebase-admin';

const db = admin.firestore();
const usersCollection = db.collection('users');

// Função para configurar MFA
export const configureMFA = async (req: Request, res: Response) => {
    const secret = speakeasy.generateSecret({ length: 20 });

    if (!secret.otpauth_url) {
        return res.status(500).send('Erro ao gerar o URL OTP Auth');
    }

    try {
        const userId = req.user?.uid; // Assumindo que o ID do usuário está disponível em req.user
        if (!userId) {
            return res.status(401).send('Usuário não autenticado');
        }

        // Salvar a chave MFA no Firestore
        await usersCollection.doc(userId).update({ mfaSecret: secret.base32 });

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return res.status(500).send('Erro ao gerar QR Code');
            }

            res.send({ secret: secret.base32, qrCode: data_url });
        });
    } catch (error) {
        res.status(500).send('Erro ao configurar MFA');
    }
};

// Função para verificar MFA
export const verifyMFA = async (req: Request, res: Response) => {
    const { token, userId } = req.body;

    try {
        // Recuperar o segredo MFA do Firestore
        const userDoc = await usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).send('Usuário não encontrado');
        }

        const user = userDoc.data();
        const secret = user?.mfaSecret;

        if (!secret) {
            return res.status(400).send('MFA não configurado para este usuário');
        }

        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
        });

        if (verified) {
            res.send('MFA verificado com sucesso');
        } else {
            res.status(400).send('Código MFA inválido');
        }
    } catch (error) {
        res.status(500).send('Erro ao verificar MFA');
    }
};
