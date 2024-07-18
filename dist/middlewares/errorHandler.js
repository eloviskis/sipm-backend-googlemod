"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';
    const errors = err.errors || null;
    res.status(statusCode).json({
        message,
        errors,
    });
};
exports.errorHandler = errorHandler;
