export class CommandParamsHelper {
  private params: Record<string, string | undefined> = {};

  constructor(rawArgs: Array<string>) {
    rawArgs.forEach((raw) => {
      if (raw.startsWith('--') && raw.includes('=')) {
        const tmp = raw.split('=');
        this.params[tmp[0]] = tmp[1];
      }

      if (raw.includes('--help')) this.params['--help'] = 'true';
    });
  }

  getBoolean(paramKey: string): boolean {
    return this.params[paramKey]?.toString().toLocaleLowerCase() === 'true';
  }

  getNumber(paramKey: string): number {
    const number = Number.parseInt(this.params[paramKey] as string, 10);

    if (Number.isNaN(number)) {
      throw new Error('Error to convert number');
    }

    return number;
  }

  get(paramKey: string) {
    return this.params[paramKey] || '';
  }

  exists(paramKey: string) {
    return !!this.params[paramKey];
  }
}
