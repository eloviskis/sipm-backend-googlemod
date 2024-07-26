import { Request, Response } from 'express';
import HomePageContent from '../models/HomePageContent';

export const getHomePageContent = async (req: Request, res: Response) => {
  const content = await HomePageContent.findOne();
  res.json(content);
};

export const updateHomePageContent = async (req: Request, res: Response) => {
  const content = await HomePageContent.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(content);
};
