"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/messages', authMiddleware_1.authMiddleware, (req, res) => (0, messageController_1.sendMessage)(req, res));
router.get('/messages/:userId', authMiddleware_1.authMiddleware, (req, res) => (0, messageController_1.getMessages)(req, res));
exports.default = router;
