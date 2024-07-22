import { Request, Response, NextFunction } from 'express';

const mfaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Placeholder para implementação de MFA
    // Verificar se o usuário passou pela autenticação multifator
    next();
};

export default mfaMiddleware;
