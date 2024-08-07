"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedController_1 = require("../controllers/feedController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/feed', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ViewFeed'), feedController_1.getFeedItems);
router.post('/feed', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ManageFeed'), feedController_1.createFeedItem);
exports.default = router;
