const LOG_LEVEL = (process.env.LOG_LEVEL || 'debug').toLowerCase();

const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
} as const;

function shouldLog(level: keyof typeof LEVELS) {
  const configuredLevel = LEVELS[LOG_LEVEL as keyof typeof LEVELS] ?? LEVELS.debug;
  return LEVELS[level] >= configuredLevel;
}

function sanitize(value: unknown): unknown {
  if (!value || typeof value !== 'object') return value;

  if (Array.isArray(value)) return value.map(sanitize);

  const result: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    const lowerKey = key.toLowerCase();

    if (
      lowerKey.includes('password') ||
      lowerKey.includes('token') ||
      lowerKey.includes('secret') ||
      lowerKey.includes('authorization')
    ) {
      result[key] = '[REDACTED]';
    } else {
      result[key] = sanitize(item);
    }
  }

  return result;
}

function write(level: keyof typeof LEVELS, message: string, meta?: unknown) {
  if (!shouldLog(level)) return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (meta === undefined) {
    console.log(`${prefix} ${message}`);
    return;
  }

  console.log(`${prefix} ${message}`, sanitize(meta));
}

export const logger = {
  debug: (message: string, meta?: unknown) => write('debug', message, meta),
  info: (message: string, meta?: unknown) => write('info', message, meta),
  warn: (message: string, meta?: unknown) => write('warn', message, meta),
  error: (message: string, meta?: unknown) => write('error', message, meta),
};
