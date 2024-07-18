import { Request, Response } from 'express';

export const getPrivacyPolicy = (req: Request, res: Response) => {
    res.sendFile('privacy-policy.html', { root: __dirname });
};

export const getTermsOfService = (req: Request, res: Response) => {
    res.sendFile('terms-of-service.html', { root: __dirname });
};
