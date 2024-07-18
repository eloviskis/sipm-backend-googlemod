"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoiceController_1 = require("../controllers/invoiceController");
const router = (0, express_1.Router)();
router.post('/invoices', invoiceController_1.createInvoice);
exports.default = router;
