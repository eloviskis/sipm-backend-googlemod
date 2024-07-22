import nodemailer from 'nodemailer';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_PASS!,
    },
});

// Função para enviar notificação de novo relatório
export const sendReportNotification = async (email: string, reportId: string) => {
    const mailOptions = {
        from: process.env.GMAIL_USER!,
        to: email,
        subject: 'Novo Relatório Gerado',
        text: `Um novo relatório foi gerado. Você pode visualizá-lo no seguinte link: ${process.env.APP_URL}/reports/${reportId}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger('info', `Notificação de relatório enviada: ${info.response}`, {}); // Adicionando argumento vazio para metadados
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger('error', `Erro ao enviar notificação de relatório: ${error.message}`, {}); // Adicionando argumento vazio para metadados
        } else {
            logger('error', 'Erro desconhecido ao enviar notificação de relatório', {}); // Adicionando argumento vazio para metadados
        }
    }
};
