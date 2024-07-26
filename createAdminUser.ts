import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import User from './src/models/user';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Verifique se a variável de ambiente MONGODB_URI está definida
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined.');
    }

    // Conectar ao banco de dados
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Verificar se já existe um usuário administrador
    const existingAdmin = await User.findOne({ role: 'ADMIN' });
    if (existingAdmin) {
      console.log('Um usuário administrador já existe.');
      return;
    }

    // Criar um novo usuário administrador
    const adminUser = new User({
      name: 'Eloi Santaroza',
      email: 'eloi.santaroza@gmail.com',
      password: 'pgfi5hmi@', // Defina uma senha forte e segura
      role: 'ADMIN',
    });

    // Salvar o usuário administrador no banco de dados
    await adminUser.save();
    console.log('Usuário administrador criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
  } finally {
    // Fechar a conexão com o banco de dados
    mongoose.connection.close();
  }
};

createAdminUser();
