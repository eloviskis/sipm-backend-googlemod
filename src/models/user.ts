import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
const usersCollection = db.collection('users');

export interface User {
    id?: string;
    email: string;
    password: string;
    role: 'Admin' | 'Medico' | 'Paciente';
    permissions: string[];
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
}

// Função para criar um novo usuário com hash de senha
export const createUser = async (data: Omit<User, 'id'>) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userData = {
        ...data,
        password: hashedPassword,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await usersCollection.add(userData);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
};

// Função para obter todos os usuários
export const getUsers = async () => {
    const snapshot = await usersCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Função para obter um usuário específico
export const getUserById = async (id: string) => {
    const doc = await usersCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Usuário não encontrado');
    }
    return { id: doc.id, ...doc.data() };
};

// Função para atualizar um usuário
export const updateUser = async (id: string, data: Partial<User>) => {
    const userRef = usersCollection.doc(id);
    const user = (await userRef.get()).data() as User;

    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
    }

    const updatedData = {
        ...user,
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userRef.update(updatedData);
    const updatedUser = await userRef.get();
    return { id: updatedUser.id, ...updatedUser.data() };
};

// Função para deletar um usuário
export const deleteUser = async (id: string) => {
    const userRef = usersCollection.doc(id);
    await userRef.delete();
    return { id };
};

// Função para validar a senha do usuário
export const isValidPassword = async (user: User, password: string) => {
    return bcrypt.compare(password, user.password);
};

// Função para definir o token de redefinição de senha
export const setResetPasswordToken = async (email: string, token: string, expires: number) => {
    const snapshot = await usersCollection.where('email', '==', email).get();
    if (snapshot.empty) {
        throw new Error('Usuário não encontrado');
    }
    const userRef = snapshot.docs[0].ref;
    await userRef.update({
        resetPasswordToken: token,
        resetPasswordExpires: expires,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const updatedUser = await userRef.get();
    return { id: updatedUser.id, ...updatedUser.data() };
};

// Função para verificar o token de redefinição de senha
export const verifyResetPasswordToken = async (token: string) => {
    const snapshot = await usersCollection.where('resetPasswordToken', '==', token).get();
    if (snapshot.empty) {
        throw new Error('Token inválido ou expirado');
    }
    const user = snapshot.docs[0].data() as User;
    if (user.resetPasswordExpires && user.resetPasswordExpires < Date.now()) {
        throw new Error('Token expirado');
    }
    return { id: snapshot.docs[0].id, ...user };
};
