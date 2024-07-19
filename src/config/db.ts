import mongoose from 'mongoose';

// Função para conectar ao banco de dados MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } as mongoose.ConnectOptions);
        console.log('MongoDB conectado...');
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
};

export default connectDB;
