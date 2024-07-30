import { Request, Response } from 'express';
import User from '../models/userModel';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Redefinição de senha',
      text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n` +
            `Por favor, clique no link a seguir, ou cole-o em seu navegador para concluir o processo:\n\n` +
            `http://${req.headers.host}/reset/${token}\n\n` +
            `Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Erro ao enviar e-mail:', err);
        return res.status(500).json({ message: 'Erro ao enviar e-mail' });
      }
      res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
    });
  } catch (error) {
    console.error('Erro ao processar solicitação de redefinição de senha:', error);
    res.status(500).json({ message: 'Erro ao processar solicitação de redefinição de senha' });
  }
};
