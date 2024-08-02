import admin from 'firebase-admin';
import firebase from 'firebase/app';
import 'firebase/auth';
import User, { IUser } from '../models/user';
import logger from '../middlewares/logger';

// Inicializar Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

// Serializar e desserializar usuário
export const serializeUser = (user: any, done: any) => {
  done(null, user.uid);
};

export const deserializeUser = async (uid: string, done: any) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    const user = await User.findOne({ uid: userRecord.uid });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
};

// Função para verificar se o usuário existe e criar se não existir
const findOrCreateUser = async (uid: string, email: string, displayName: string) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      uid,
      name: displayName,
      email,
      password: '',
      role: 'USER',
    } as IUser);
    await user.save();
  }
  return user;
};

// Configuração do Google Auth Provider
export const googleAuthProvider = async (token: string, done: any) => {
  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    const result = await firebase.auth().signInWithCredential(credential);
    const user = await findOrCreateUser(result.user?.uid, result.user?.email!, result.user?.displayName!);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Configuração do Facebook Auth Provider
export const facebookAuthProvider = async (token: string, done: any) => {
  try {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    const result = await firebase.auth().signInWithCredential(credential);
    const user = await findOrCreateUser(result.user?.uid, result.user?.email!, result.user?.displayName!);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Configuração do LinkedIn Auth Provider (utilizando Firebase Auth custom token)
export const linkedInAuthProvider = async (token: string, done: any) => {
  try {
    const userRecord = await admin.auth().verifyIdToken(token);
    const user = await findOrCreateUser(userRecord.uid, userRecord.email!, userRecord.name!);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export default {
  serializeUser,
  deserializeUser,
  googleAuthProvider,
  facebookAuthProvider,
  linkedInAuthProvider,
};
