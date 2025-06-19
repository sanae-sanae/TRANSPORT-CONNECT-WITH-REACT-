const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${level.toUpperCase()}] ${timestamp} - ${message}`);
};

export const logger = {
  info: (message) => log('info', message),
  error: (message) => log('error', message),
  warn: (message) => log('warn', message),
  debug: (message) => log('debug', message)
};