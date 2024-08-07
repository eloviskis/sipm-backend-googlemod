"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logging_1 = require("@google-cloud/logging");
const logger_1 = __importDefault(require("./logger")); // Adicionando middleware de logger
const logging = new logging_1.Logging();
const log = logging.log('errors');
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    // Enviar log para Google Cloud Logging
    const metadata = {
        resource: { type: 'global' },
    };
    const entry = log.entry(metadata, {
        severity: 'ERROR',
        message,
        statusCode,
        path: req.path,
        method: req.method,
        ip: req.ip,
        errors,
    });
    yield log.write(entry);
    res.status(statusCode).json({
        message,
        errors,
    });
});
exports.errorHandler = errorHandler;
