"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTermsOfService = exports.getPrivacyPolicy = void 0;
const getPrivacyPolicy = (req, res) => {
    res.sendFile('privacy-policy.html', { root: __dirname });
};
exports.getPrivacyPolicy = getPrivacyPolicy;
const getTermsOfService = (req, res) => {
    res.sendFile('terms-of-service.html', { root: __dirname });
};
exports.getTermsOfService = getTermsOfService;
