import { Request, Response } from 'express';
import Report, { IReport } from '../models/report';

export const createReport = async (req: Request, res: Response) => {
    try {
        const report: IReport = new Report(req.body);
        const savedReport = await report.save();
        res.status(201).send(savedReport);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getReports = async (req: Request, res: Response) => {
    try {
        const reports = await Report.find({});
        res.send(reports);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getReport = async (req: Request, res: Response) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).send();
        }
        res.send(report);
    } catch (error) {
        res.status(500).send(error);
    }
};
