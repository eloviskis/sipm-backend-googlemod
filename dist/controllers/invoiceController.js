"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = void 0;
const pdfService_1 = require("../services/pdfService");
const createInvoice = (req, res) => {
    try {
        const invoiceData = req.body;
        (0, pdfService_1.generateInvoice)(res, invoiceData);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.createInvoice = createInvoice;
