import nodemailer from 'nodemailer';

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_PASS!,
    },
});

// Função para enviar confirmação de agendamento
export const sendAppointmentConfirmation = (email: string, date: Date) => {
    const mailOptions = {
        from: process.env.GMAIL_USER!,
        to: email,
        subject: 'Confirmação de Agendamento',
        text: `Sua consulta foi agendada para ${date}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Erro ao enviar email: ${error.message}`);
        } else {
            console.log(`Email enviado: ${info.response}`);
        }
    });
};

// Função para enviar lembrete de agendamento
export const sendAppointmentReminder = (email: string, date: Date) => {
    const mailOptions = {
        from: process.env.GMAIL_USER!,
        to: email,
        subject: 'Lembrete de Agendamento',
        text: `Lembrete: Sua consulta está agendada para ${date}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Erro ao enviar email: ${error.message}`);
        } else {
            console.log(`Email enviado: ${info.response}`);
        }
    });
};
