"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("./logger")); // Adicionando middleware de logger
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';
    const errors = err.errors || null;
    // Adicionando log detalhado de erro
    (0, logger_1.default)('error', `Erro: ${message}`, {
        statusCode,
        path: req.path,
        method: req.method,
        ip: req.ip,
        errors,
    });
    res.status(statusCode).json({
        message,
        errors,
    });
};
exports.errorHandler = errorHandler;
