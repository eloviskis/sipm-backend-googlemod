"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetPasswordToken = exports.setResetPasswordToken = exports.isValidPassword = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const usersCollection = db.collection('users');
// Função para criar um novo usuário com hash de senha
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(data.password, salt);
    const userData = Object.assign(Object.assign({}, data), { password: hashedPassword, createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() });
    const docRef = yield usersCollection.add(userData);
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createUser = createUser;
// Função para obter todos os usuários
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield usersCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getUsers = getUsers;
// Função para obter um usuário específico
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield usersCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Usuário não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getUserById = getUserById;
// Função para atualizar um usuário
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = usersCollection.doc(id);
    const user = (yield userRef.get()).data();
    if (data.password) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, salt);
        data.password = hashedPassword;
    }
    const updatedData = Object.assign(Object.assign(Object.assign({}, user), data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() });
    yield userRef.update(updatedData);
    const updatedUser = yield userRef.get();
    return Object.assign({ id: updatedUser.id }, updatedUser.data());
});
exports.updateUser = updateUser;
// Função para deletar um usuário
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = usersCollection.doc(id);
    yield userRef.delete();
    return { id };
});
exports.deleteUser = deleteUser;
// Função para validar a senha do usuário
const isValidPassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(password, user.password);
});
exports.isValidPassword = isValidPassword;
// Função para definir o token de redefinição de senha
const setResetPasswordToken = (email, token, expires) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield usersCollection.where('email', '==', email).get();
    if (snapshot.empty) {
        throw new Error('Usuário não encontrado');
    }
    const userRef = snapshot.docs[0].ref;
    yield userRef.update({
        resetPasswordToken: token,
        resetPasswordExpires: expires,
        updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
    });
    const updatedUser = yield userRef.get();
    return Object.assign({ id: updatedUser.id }, updatedUser.data());
});
exports.setResetPasswordToken = setResetPasswordToken;
// Função para verificar o token de redefinição de senha
const verifyResetPasswordToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield usersCollection.where('resetPasswordToken', '==', token).get();
    if (snapshot.empty) {
        throw new Error('Token inválido ou expirado');
    }
    const user = snapshot.docs[0].data();
    if (user.resetPasswordExpires && user.resetPasswordExpires < Date.now()) {
        throw new Error('Token expirado');
    }
    return Object.assign({ id: snapshot.docs[0].id }, user);
});
exports.verifyResetPasswordToken = verifyResetPasswordToken;
