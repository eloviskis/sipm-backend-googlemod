"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
router.post('/reports', reportController_1.createReport);
router.get('/reports', reportController_1.getReports);
router.get('/reports/:id', reportController_1.getReport);
exports.default = router;
