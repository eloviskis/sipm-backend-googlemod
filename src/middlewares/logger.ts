const logger = (level: 'info' | 'error', message: string, meta?: any) => {
    console[level](`${new Date().toISOString()} - ${message}`, meta);
};

export default logger;
