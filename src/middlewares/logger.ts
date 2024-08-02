import { Logging } from '@google-cloud/logging';

// Inicializa o cliente do Google Cloud Logging
const logging = new Logging();
const log = logging.log('application-logs');

const logger = async (level: 'info' | 'error', message: string, meta?: any) => {
    const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()}: ${message}`;
    
    // Envia o log para o console
    if (meta) {
        console[level](logMessage, meta);
    } else {
        console[level](logMessage);
    }

    // Envia o log para o Google Cloud Logging
    const metadata = {
        resource: { type: 'global' },
        severity: level.toUpperCase(),
    };

    const entry = log.entry(metadata, { message, ...meta });
    await log.write(entry);
};

export default logger;
