"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/profile', authMiddleware_1.authMiddleware, profileController_1.getProfile);
router.patch('/profile', authMiddleware_1.authMiddleware, profileController_1.updateProfile);
exports.default = router;
