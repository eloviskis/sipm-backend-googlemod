"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const router = (0, express_1.Router)();
router.post('/messages', (req, res) => (0, messageController_1.sendMessage)(req, res));
router.get('/messages/:userId', (req, res) => (0, messageController_1.getMessages)(req, res));
exports.default = router;
