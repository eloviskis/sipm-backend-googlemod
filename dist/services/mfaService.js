"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMfaToken = exports.generateQrCode = exports.generateMfaSecret = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
/**
 * Função para gerar um segredo TOTP
 * @returns {speakeasy.GeneratedSecret} - O segredo TOTP gerado
 */
const generateMfaSecret = () => {
    const secret = speakeasy_1.default.generateSecret({ length: 20 });
    return secret;
};
exports.generateMfaSecret = generateMfaSecret;
/**
 * Função para gerar um QR Code para o segredo TOTP
 * @param {string} otpauthUrl - A URL OTP Auth
 * @returns {Promise<string>} - Uma promessa que resolve com o URL do QR Code gerado
 */
const generateQrCode = (otpauthUrl) => {
    return new Promise((resolve, reject) => {
        qrcode_1.default.toDataURL(otpauthUrl, (err, data_url) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data_url);
            }
        });
    });
};
exports.generateQrCode = generateQrCode;
/**
 * Função para verificar o token TOTP
 * @param {string} secret - O segredo TOTP
 * @param {string} token - O token TOTP
 * @returns {boolean} - Retorna true se o token for válido, false caso contrário
 */
const verifyMfaToken = (secret, token) => {
    return speakeasy_1.default.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
    });
};
exports.verifyMfaToken = verifyMfaToken;
