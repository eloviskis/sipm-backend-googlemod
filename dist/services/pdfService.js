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
        // Adicione conteúdo ao PDF aqui
        doc.text(`Fatura para ${invoiceData.clientName}`, 50, 50);
        doc.text(`Data: ${new Date().toLocaleDateString()}`, 50, 70);
        doc.text(`Total: R$${invoiceData.total}`, 50, 90);
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
