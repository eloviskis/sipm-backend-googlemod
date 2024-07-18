import { Request, Response } from 'express';
import Page from '../models/page';

export const createPage = async (req: Request, res: Response) => {
    try {
        const page = new Page(req.body);
        await page.save();
        res.status(201).send(page);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPages = async (req: Request, res: Response) => {
    try {
        const pages = await Page.find({});
        res.send(pages);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPage = async (req: Request, res: Response) => {
    try {
        const page = await Page.findById(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        res.send(page);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePage = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const page = await Page.findById(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        updates.forEach((update) => page.set(update, req.body[update]));
        await page.save();
        res.send(page);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePage = async (req: Request, res: Response) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        res.send(page);
    } catch (error) {
        res.status(500).send(error);
    }
};
