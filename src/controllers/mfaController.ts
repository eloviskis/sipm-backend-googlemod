import { Request, Response } from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export const configureMFA = (req: Request, res: Response) => {
    const secret = speakeasy.generateSecret({ length: 20 });

    if (!secret.otpauth_url) {
        return res.status(500).send('Erro ao gerar o URL OTP Auth');
    }

    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
            return res.status(500).send('Erro ao gerar QR Code');
        }

        // Salvar a chave MFA no usuário (deveria ser implementado)
        // req.user.mfaSecret = secret.base32;
        // req.user.save();

        res.send({ secret: secret.base32, qrCode: data_url });
    });
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
    