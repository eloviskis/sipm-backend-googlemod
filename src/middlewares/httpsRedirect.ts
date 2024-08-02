import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to ensure that all requests are served over HTTPS.
 * Redirects HTTP requests to HTTPS.
 */
export const ensureHttps = (req: Request, res: Response, next: NextFunction) => {
    // Check if the request is already HTTPS
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        // If the request is HTTPS, continue
        return next();
    } else {
        // Redirect HTTP to HTTPS
        const secureUrl = `https://${req.headers.host}${req.url}`;
        return res.redirect(301, secureUrl);
    }
};
