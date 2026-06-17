import { MODULE_TITLE } from "./constants";

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "OFF";

const LEVELS: Record<LogLevel, number> = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
  OFF: 50,
};

function configuredLevel(): LogLevel {
  try {
    // get() returns fvtt-types' Setting wrapper type, not the raw value, so cast via unknown.
    const value = game.settings.get("auto-grid", "log-level") as unknown as LogLevel;
    return value in LEVELS ? value : "INFO";
  } catch (_e) {
    return "INFO";
  }
}

function shouldLog(level: LogLevel): boolean {
  return LEVELS[level] >= LEVELS[configuredLevel()];
}

function write(level: LogLevel, message: string, ...payload: unknown[]) {
  if (!shouldLog(level)) return;
  const prefix = `${MODULE_TITLE} | ${message}`;
  if (level === "ERROR") console.error(prefix, ...payload);
  else if (level === "WARN") console.warn(prefix, ...payload);
  else if (level === "DEBUG") console.debug(prefix, ...payload);
  else console.info(prefix, ...payload);
}

const logger = {
  debug: (message: string, ...payload: unknown[]) => write("DEBUG", message, ...payload),
  info: (message: string, ...payload: unknown[]) => write("INFO", message, ...payload),
  warn: (message: string, ...payload: unknown[]) => write("WARN", message, ...payload),
  error: (message: string, ...payload: unknown[]) => write("ERROR", message, ...payload),
};

export default logger;
