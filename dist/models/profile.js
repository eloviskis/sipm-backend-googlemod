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
exports.deleteProfile = exports.updateProfile = exports.getProfileById = exports.getProfiles = exports.createProfile = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const profilesCollection = db.collection('profiles');
// Função para criar um novo perfil
const createProfile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield profilesCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createProfile = createProfile;
// Função para obter todos os perfis
const getProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield profilesCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getProfiles = getProfiles;
// Função para obter um perfil específico
const getProfileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield profilesCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Perfil não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getProfileById = getProfileById;
// Função para atualizar um perfil
const updateProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = profilesCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateProfile = updateProfile;
// Função para deletar um perfil
const deleteProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = profilesCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteProfile = deleteProfile;
