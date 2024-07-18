import PDFDocument from 'pdfkit';
import { Response } from 'express';

export const generateInvoice = (res: Response, invoiceData: any) => {
    const doc = new PDFDocument();
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
