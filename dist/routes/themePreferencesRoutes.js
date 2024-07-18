"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const themePreferencesController_1 = require("../controllers/themePreferencesController");
const router = (0, express_1.Router)();
router.patch('/theme-preferences/:userId', themePreferencesController_1.updateThemePreferences);
exports.default = router;
