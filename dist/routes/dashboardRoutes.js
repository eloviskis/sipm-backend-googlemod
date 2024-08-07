"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/dashboard', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ViewDashboard'), dashboardController_1.getDashboardData);
exports.default = router;
