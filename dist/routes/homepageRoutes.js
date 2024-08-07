"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepageController_1 = require("../controllers/homepageController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/homepage-content', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ViewHomePageContent'), homepageController_1.getHomepageContent);
exports.default = router;
