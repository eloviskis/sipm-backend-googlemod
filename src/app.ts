import express from 'express';
import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';
import { ensureHttps } from './middlewares/httpsRedirect';

const app = express();

// Middleware para garantir HTTPS
app.use(ensureHttps);

app.use(express.json());
app.use('/api/auth', authRoutes); // Adicionando rotas de autenticação
app.use(authMiddleware); // Adicionando o middleware de autenticação
app.use('/api', userRoutes);
app.use('/api', appointmentRoutes);
app.use(errorHandler);

export default app;
