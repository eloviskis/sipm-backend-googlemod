"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepageController_1 = require("../controllers/homepageController");
const router = (0, express_1.Router)();
router.get('/homepage-content', homepageController_1.getHomepageContent);
exports.default = router;
