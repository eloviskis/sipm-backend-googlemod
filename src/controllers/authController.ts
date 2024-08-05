import { Request, Response } from 'express';
import admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import logger from '../middlewares/logger';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = admin.firestore();
const usersCollection = db.collection('users');

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Verifica se o email foi fornecido
    if (!email) {
      logger('error', 'Email não fornecido na solicitação de redefinição de senha');
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    const snapshot = await usersCollection.where('email', '==', email).get();
    if (snapshot.empty) {
      logger('error', `Usuário não encontrado para o email: ${email}`);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userDoc = snapshot.docs[0];
    const token = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = token;
    const resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await userDoc.ref.update({ resetPasswordToken, resetPasswordExpires });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Redefinição de senha',
      text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n` +
            `Por favor, clique no link a seguir, ou cole-o em seu navegador para concluir o processo:\n\n` +
            `http://${req.headers.host}/reset/${token}\n\n` +
            `Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`,
    };

    await sgMail.send(mailOptions);
    logger('info', `E-mail de redefinição de senha enviado para: ${email}`);
    res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger('error', `Erro ao processar solicitação de redefinição de senha: ${error.message}`);
    } else {
      logger('error', 'Erro desconhecido ao processar solicitação de redefinição de senha');
    }
    res.status(500).json({ message: 'Erro ao processar solicitação de redefinição de senha' });
  }
};
