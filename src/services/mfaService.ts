import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

// Função para gerar um segredo TOTP
export const generateMfaSecret = () => {
    const secret = speakeasy.generateSecret({ length: 20 });
    return secret;
};

// Função para gerar um QR Code para o segredo TOTP
export const generateQrCode = (otpauthUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        qrcode.toDataURL(otpauthUrl, (err, data_url) => {
            if (err) {
                reject(err);
            } else {
                resolve(data_url);
            }
        });
    });
};

// Função para verificar o token TOTP
export const verifyMfaToken = (secret: string, token: string) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
    });
};
