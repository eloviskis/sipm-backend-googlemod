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
exports.linkedInAuthProvider = exports.facebookAuthProvider = exports.googleAuthProvider = exports.deserializeUser = exports.serializeUser = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../middlewares/logger"));
// Inicializar Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});
app_1.default.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
});
// Serializar e desserializar usuário
const serializeUser = (user, done) => {
    done(null, user.uid);
};
exports.serializeUser = serializeUser;
const deserializeUser = (uid, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRecord = yield firebase_admin_1.default.auth().getUser(uid);
        const user = yield user_1.default.findOne({ uid: userRecord.uid });
        done(null, user);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Error deserializing user', { error });
        done(error, null);
    }
});
exports.deserializeUser = deserializeUser;
// Função para verificar se o usuário existe e criar se não existir
const findOrCreateUser = (uid, email, displayName) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.findOne({ email });
    if (!user) {
        user = new user_1.default({
            uid,
            name: displayName,
            email,
            password: '',
            role: 'USER',
        });
        yield user.save();
    }
    return user;
});
// Configuração do Google Auth Provider
const googleAuthProvider = (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const credential = app_1.default.auth.GoogleAuthProvider.credential(token);
        const result = yield app_1.default.auth().signInWithCredential(credential);
        const user = yield findOrCreateUser((_a = result.user) === null || _a === void 0 ? void 0 : _a.uid, (_b = result.user) === null || _b === void 0 ? void 0 : _b.email, (_c = result.user) === null || _c === void 0 ? void 0 : _c.displayName);
        done(null, user);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Google auth provider error', { error });
        done(error, false);
    }
});
exports.googleAuthProvider = googleAuthProvider;
// Configuração do Facebook Auth Provider
const facebookAuthProvider = (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const credential = app_1.default.auth.FacebookAuthProvider.credential(token);
        const result = yield app_1.default.auth().signInWithCredential(credential);
        const user = yield findOrCreateUser((_d = result.user) === null || _d === void 0 ? void 0 : _d.uid, (_e = result.user) === null || _e === void 0 ? void 0 : _e.email, (_f = result.user) === null || _f === void 0 ? void 0 : _f.displayName);
        done(null, user);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Facebook auth provider error', { error });
        done(error, false);
    }
});
exports.facebookAuthProvider = facebookAuthProvider;
// Configuração do LinkedIn Auth Provider (utilizando Firebase Auth custom token)
const linkedInAuthProvider = (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRecord = yield firebase_admin_1.default.auth().verifyIdToken(token);
        const user = yield findOrCreateUser(userRecord.uid, userRecord.email, userRecord.name);
        done(null, user);
    }
    catch (error) {
        (0, logger_1.default)('error', 'LinkedIn auth provider error', { error });
        done(error, false);
    }
});
exports.linkedInAuthProvider = linkedInAuthProvider;
exports.default = {
    serializeUser: exports.serializeUser,
    deserializeUser: exports.deserializeUser,
    googleAuthProvider: exports.googleAuthProvider,
    facebookAuthProvider: exports.facebookAuthProvider,
    linkedInAuthProvider: exports.linkedInAuthProvider,
};
