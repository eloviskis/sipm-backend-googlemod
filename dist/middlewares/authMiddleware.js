"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionMiddleware = exports.authMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
// Middleware de autenticação existente
const authMiddleware = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authMiddleware = authMiddleware;
// Novo middleware de permissão
const permissionMiddleware = (permission) => {
    return (req, res, next) => {
        // Verifica se o usuário autenticado possui a permissão necessária
        if (req.user && req.user.permissions.includes(permission)) {
            next(); // Se possuir a permissão, continue
        }
        else {
            res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' }); // Caso contrário, retorne erro 403
        }
    };
};
exports.permissionMiddleware = permissionMiddleware;
