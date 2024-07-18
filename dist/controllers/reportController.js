"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReport = exports.getReports = exports.createReport = void 0;
const report_1 = __importDefault(require("../models/report"));
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = new report_1.default(req.body);
        const savedReport = yield report.save();
        res.status(201).send(savedReport);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createReport = createReport;
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield report_1.default.find({});
        res.send(reports);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getReports = getReports;
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield report_1.default.findById(req.params.id);
        if (!report) {
            return res.status(404).send();
        }
        res.send(report);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getReport = getReport;
