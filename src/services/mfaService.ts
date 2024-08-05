import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

/**
 * Função para gerar um segredo TOTP
 * @returns {speakeasy.GeneratedSecret} - O segredo TOTP gerado
 */
export const generateMfaSecret = (): speakeasy.GeneratedSecret => {
    const secret = speakeasy.generateSecret({ length: 20 });
    return secret;
};

/**
 * Função para gerar um QR Code para o segredo TOTP
 * @param {string} otpauthUrl - A URL OTP Auth
 * @returns {Promise<string>} - Uma promessa que resolve com o URL do QR Code gerado
 */
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

/**
 * Função para verificar o token TOTP
 * @param {string} secret - O segredo TOTP
 * @param {string} token - O token TOTP
 * @returns {boolean} - Retorna true se o token for válido, false caso contrário
 */
export const verifyMfaToken = (secret: string, token: string): boolean => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
    });
};
