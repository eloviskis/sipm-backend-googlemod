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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const user_1 = __importDefault(require("../models/user"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
// Configuração do Google Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.findOne({ email: profile.emails[0].value });
    if (!user) {
        user = new user_1.default({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: '',
            role: 'USER',
        });
        yield user.save();
    }
    return done(null, user);
})));
// Configuração do Facebook Strategy
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.findOne({ email: profile.emails[0].value });
    if (!user) {
        user = new user_1.default({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: '',
            role: 'USER',
        });
        yield user.save();
    }
    return done(null, user);
})));
// Configuração do LinkedIn Strategy
passport_1.default.use(new passport_linkedin_oauth2_1.Strategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.findOne({ email: profile.emails[0].value });
    if (!user) {
        user = new user_1.default({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: '',
            role: 'USER',
        });
        yield user.save();
    }
    return done(null, user);
})));
exports.default = passport_1.default;
