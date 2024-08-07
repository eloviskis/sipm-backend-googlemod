"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureHttps = void 0;
/**
 * Middleware to ensure that all requests are served over HTTPS.
 * Redirects HTTP requests to HTTPS.
 */
const ensureHttps = (req, res, next) => {
    // Check if the request is already HTTPS
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        // If the request is HTTPS, continue
        return next();
    }
    else {
        // Redirect HTTP to HTTPS
        const secureUrl = `https://${req.headers.host}${req.url}`;
        return res.redirect(301, secureUrl);
    }
};
exports.ensureHttps = ensureHttps;
