"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("@google-cloud/logging");
// Inicializa o cliente do Google Cloud Logging
const logging = new logging_1.Logging();
const log = logging.log('application-logs');
const logger = (level, message, meta) => __awaiter(void 0, void 0, void 0, function* () {
    const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()}: ${message}`;
    // Envia o log para o console
    if (meta) {
        console[level](logMessage, meta);
    }
    else {
        console[level](logMessage);
    }
    // Envia o log para o Google Cloud Logging
    const metadata = {
        resource: { type: 'global' },
        severity: level.toUpperCase(),
    };
    const entry = log.entry(metadata, Object.assign({ message }, meta));
    yield log.write(entry);
});
exports.default = logger;
