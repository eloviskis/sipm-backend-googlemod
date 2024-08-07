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
exports.deleteThemePreferences = exports.updateThemePreferences = exports.getThemePreferencesById = exports.getThemePreferences = exports.createThemePreferences = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const themePreferencesCollection = db.collection('themePreferences');
// Função para criar uma nova preferência de tema
const createThemePreferences = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield themePreferencesCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createThemePreferences = createThemePreferences;
// Função para obter todas as preferências de tema
const getThemePreferences = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield themePreferencesCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getThemePreferences = getThemePreferences;
// Função para obter uma preferência de tema específica
const getThemePreferencesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield themePreferencesCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Preferência de tema não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getThemePreferencesById = getThemePreferencesById;
// Função para atualizar uma preferência de tema
const updateThemePreferences = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = themePreferencesCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateThemePreferences = updateThemePreferences;
// Função para deletar uma preferência de tema
const deleteThemePreferences = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = themePreferencesCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteThemePreferences = deleteThemePreferences;
