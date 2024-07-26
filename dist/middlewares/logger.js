"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (level, message, meta) => {
    const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()}: ${message}`;
    if (meta) {
        console[level](logMessage, meta);
    }
    else {
        console[level](logMessage);
    }
};
exports.default = logger;
