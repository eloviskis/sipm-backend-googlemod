import { Request, Response } from 'express';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

export const configureMFA = (req: Request, res: Response) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    if (secret.otpauth_url) {
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return res.status(500).send('Erro ao gerar QR Code');
            }
            res.send({ secret: secret.base32, qrCode: data_url });
        });
    } else {
        res.status(500).send('Erro ao gerar URL OTPAuth');
    }
};

export const verifyMFA = (req: Request, res: Response) => {
    const { token, secret } = req.body;
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
};