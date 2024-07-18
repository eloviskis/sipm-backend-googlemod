"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureHttps = void 0;
const ensureHttps = (req, res, next) => {
    if (req.secure) {
        // Se a solicitação é HTTPS, continue
        return next();
    }
    else {
        // Redireciona HTTP para HTTPS
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
};
exports.ensureHttps = ensureHttps;
