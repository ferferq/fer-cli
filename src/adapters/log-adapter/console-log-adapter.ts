import { ILogAdapter } from "./interface-log-adapter";

export class ConsoleLogAdapter implements ILogAdapter {
  private provider = console;
  private levelNumber: Record<string, number> = {
    'error': 1,
    'info': 2,
    'debug': 3
  };
  private level = this.levelNumber['debug'];

  private readonly consoleColors = {
    red: '\x1b[31m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
  };

  setLevel(level: string) {
    this.level = this.levelNumber[level.toLowerCase()];
  }

  info(msg: string) {
    if (this.level >= this.levelNumber['info']) this.provider.info(this.consoleColors.green, msg);
  }

  debug(msg: string) {
    if (this.level >= this.levelNumber['debug']) this.provider.info(this.consoleColors.yellow, msg);
  }

  error(msg: string) {
    if (this.level >= this.levelNumber['error'])
      this.provider.error(this.consoleColors.red, msg);
  }
}
