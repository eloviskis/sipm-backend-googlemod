import admin from 'firebase-admin';
import logger from '../middlewares/logger';

const connectDB = async () => {
    const serviceAccount = require('./serviceAccountKeyGFire.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();

    try {
        await db.settings({ timestampsInSnapshots: true });
        logger('info', 'Conexão com o Firestore estabelecida com sucesso');
    } catch (error: any) {
        logger('error', 'Erro ao conectar ao Firestore:', error);
        process.exit(1);
    }
};

export default connectDB;
