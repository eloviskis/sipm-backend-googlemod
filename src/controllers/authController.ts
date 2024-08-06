import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { id: decodedToken.uid };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};
