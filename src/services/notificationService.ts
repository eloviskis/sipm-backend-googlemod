import nodemailer from 'nodemailer';

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER || 'default_gmail_user',
        pass: process.env.GMAIL_PASS || 'default_gmail_pass',
    },
});

// Função para enviar confirmação de agendamento
export const sendAppointmentConfirmation = async (email: string, date: Date): Promise<void> => {
    const mailOptions = {
        from: process.env.GMAIL_USER || 'default_gmail_user',
        to: email,
        subject: 'Confirmação de Agendamento',
        text: `Sua consulta foi agendada para ${date}.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email de confirmação enviado: ${info.response}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Erro ao enviar email de confirmação: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao enviar email de confirmação');
        }
    }
};

// Função para enviar lembrete de agendamento
export const sendAppointmentReminder = async (email: string, date: Date): Promise<void> => {
    const mailOptions = {
        from: process.env.GMAIL_USER || 'default_gmail_user',
        to: email,
        subject: 'Lembrete de Agendamento',
        text: `Lembrete: Sua consulta está agendada para ${date}.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email de lembrete enviado: ${info.response}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Erro ao enviar email de lembrete: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao enviar email de lembrete');
        }
    }
};
