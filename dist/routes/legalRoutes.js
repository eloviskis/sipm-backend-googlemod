"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const legalController_1 = require("../controllers/legalController");
const router = (0, express_1.Router)();
router.get('/privacy-policy', legalController_1.getPrivacyPolicy);
router.get('/terms-of-service', legalController_1.getTermsOfService);
exports.default = router;
