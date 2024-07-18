import { Request, Response } from 'express';
import User from '../models/user';

export const updateThemePreferences = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { primaryColor, secondaryColor, backgroundColor } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }

        user.themePreferences = { primaryColor, secondaryColor, backgroundColor };
        await user.save();

        res.send(user.themePreferences);
    } catch (error) {
        res.status(400).send(error);
    }
};
