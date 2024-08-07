"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generateInvoice = (invoiceData) => {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default();
        const invoicePath = path_1.default.join(__dirname, `../../invoices/invoice-${Date.now()}.pdf`);
        doc.pipe(fs_1.default.createWriteStream(invoicePath));
        // Cabeçalho da fatura
        doc.fontSize(20).text(`Fatura para ${invoiceData.clientName}`, 50, 50);
        doc.fontSize(12).text(`Data: ${invoiceData.date}`, 50, 80);
        doc.text(`Total: R$${invoiceData.total.toFixed(2)}`, 50, 100);
        // Lista de itens
        doc.moveDown();
        invoiceData.items.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.description}: R$${item.amount.toFixed(2)}`);
        });
        doc.end();
        doc.on('finish', () => {
            resolve(invoicePath);
        });
        doc.on('error', (error) => {
            reject(error);
        });
    });
};
exports.generateInvoice = generateInvoice;
