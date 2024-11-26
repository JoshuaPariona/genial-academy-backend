export enum LogLevel {
  Debug = "debug",
  Warning = "warning",
  Error = "error",
  Info = "info",
  Log = "log",
}

interface Log {
  level: LogLevel;
  timestamp?: string;
  tag: string;
  feature: string;
  message: string;
  status?: string;
  path?: string;
  duration?: string;
  weight?: string;
}

export class Logger {
  private static readonly buffer: Array<Log> = [];
  private static readonly MAX_LOGS: number = 4000;
  private static readonly inConsole: boolean = true;

  public static log(log: Log): void {
    if (this.inConsole) {
      console.log(log);
    }
    this.buffer.push({
      ...log,
      timestamp: new Date().toLocaleString(),
    });
    if (this.buffer.length > this.MAX_LOGS) {
      this.buffer.shift();
    }
  }

  public static get logs(): Array<Log> {
    return this.buffer;
  }

  public static get max(): number {
    return this.MAX_LOGS;
  }
}
