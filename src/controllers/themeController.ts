import { Request, Response } from 'express';
import Theme, { ITheme } from '../models/theme';

export const createTheme = async (req: Request, res: Response) => {
    try {
        const theme: ITheme = new Theme(req.body);
        const savedTheme = await theme.save();
        res.status(201).send(savedTheme);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getThemes = async (req: Request, res: Response) => {
    try {
        const themes = await Theme.find({});
        res.send(themes);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getTheme = async (req: Request, res: Response) => {
    try {
        const theme = await Theme.findById(req.params.id);
        if (!theme) {
            return res.status(404).send();
        }
        res.send(theme);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateTheme = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'layout', 'colors'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const theme: ITheme | null = await Theme.findById(req.params.id);
        if (!theme) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in theme) {
                (theme as any)[update] = req.body[update];
            }
        });
        await theme.save();
        res.send(theme);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteTheme = async (req: Request, res: Response) => {
    try {
        const theme = await Theme.findByIdAndDelete(req.params.id);
        if (!theme) {
            return res.status(404).send();
        }
        res.send(theme);
    } catch (error) {
        res.status(500).send(error);
    }
};
