import { Response } from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoice = (invoiceData: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const invoicePath = path.join(__dirname, `../../invoices/invoice-${Date.now()}.pdf`);

        doc.pipe(fs.createWriteStream(invoicePath));

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
