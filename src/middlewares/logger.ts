const logger = (level: 'info' | 'error', message: string, meta?: any) => {
    const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()}: ${message}`;
    if (meta) {
        console[level](logMessage, meta);
    } else {
        console[level](logMessage);
    }
};

export default logger;
