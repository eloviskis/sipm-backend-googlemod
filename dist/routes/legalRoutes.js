"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const legalController_1 = require("../controllers/legalController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/privacy-policy', authMiddleware_1.authMiddleware, legalController_1.getPrivacyPolicy);
router.get('/terms-of-service', authMiddleware_1.authMiddleware, legalController_1.getTermsOfService);
exports.default = router;
