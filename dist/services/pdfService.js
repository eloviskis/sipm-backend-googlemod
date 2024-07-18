"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generateInvoice = (res, invoiceData) => {
    const doc = new pdfkit_1.default();
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.fontSize(25).text('Recibo de Pagamento', { align: 'center' });
    doc.text('----------------------------------------', { align: 'center' });
    doc.fontSize(18).text(`Nome: ${invoiceData.name}`, { align: 'left' });
    doc.text(`Data: ${invoiceData.date}`, { align: 'left' });
    doc.text(`Valor: ${invoiceData.amount}`, { align: 'left' });
    doc.text(`Descrição: ${invoiceData.description}`, { align: 'left' });
    doc.text('----------------------------------------', { align: 'center' });
    doc.end();
};
exports.generateInvoice = generateInvoice;
