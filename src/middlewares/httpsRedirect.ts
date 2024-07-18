import { Request, Response, NextFunction } from 'express';

export const ensureHttps = (req: Request, res: Response, next: NextFunction) => {
    if (req.secure) {
        // Se a solicitação é HTTPS, continue
        return next();
    } else {
        // Redireciona HTTP para HTTPS
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
};
