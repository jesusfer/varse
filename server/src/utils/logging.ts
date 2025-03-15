import logfmt from 'logfmt'

export const getLogger = (name: string) => new Logger(name)

type Level =
  // Detailed information, typically only of interest to a developer trying to
  // diagnose a problem.
  | 'DEBUG'
  // Confirmation that things are working as expected.
  | 'INFO'
  // An indication that something unexpected happened, or that a problem might
  // occur in the near future (e.g. ‘disk space low’). The software is still
  // working as expected.
  | 'WARNING'
  // Due to a more serious problem, the software has not been able to perform
  // some function.
  | 'ERROR'
  // A serious error, indicating that the program itself may be unable to
  // continue running.
  | 'CRITICAL'

class LogRecord {
  time?: string
  level: Level
  logger: string
  msg?: string

  constructor(logger: string, level: Level = Logger.WARNING) {
    this.level = level
    this.logger = logger
  }
}

class Logger {
  base: LogRecord

  public static DEBUG: Level = 'DEBUG'
  public static INFO: Level = 'INFO'
  public static WARNING: Level = 'WARNING'
  public static ERROR: Level = 'ERROR'
  public static CRITICAL: Level = 'CRITICAL'

  constructor(name: string) {
    this.base = new LogRecord(name)
  }

  log = (level: Level, message?: string, extra?: object) => {
    let record = {
      ...this.base,
      level: level,
      time: new Date().toISOString(),
      msg: message,
    }

    if (typeof extra === 'undefined') {
      logfmt.log(record)
    } else
      logfmt.log({
        ...record,
        extra: JSON.stringify(extra),
      })
  }
  debug = (message: string, extra?: object) =>
    this.log(Logger.DEBUG, message, extra)
  info = (message: string, extra?: object) =>
    this.log(Logger.INFO, message, extra)
  warning = (message: string, extra?: object) =>
    this.log(Logger.WARNING, message, extra)
  error = (error: Error | string, extra?: object) => {
    if (typeof error === 'string') {
      this.log(Logger.ERROR, error, extra)
    } else {
      extra = {
        ...this.base,
        level: Logger.ERROR,
        time: new Date().toISOString(),
        extra: JSON.stringify(extra),
      }
      logfmt.namespace(extra).error(error)
    }
  }
  critical = (message: string, extra?: object) =>
    this.log(Logger.CRITICAL, message, extra)
}
