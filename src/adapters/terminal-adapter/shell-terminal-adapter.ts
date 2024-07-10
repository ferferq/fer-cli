import util from 'util';
import childProcess from 'child_process';
import { ILogAdapter } from '../log-adapter/interface-log-adapter';
import type { IExecResult } from './interface-exec-result';
import { ITerminalAdapter } from './interface-terminal-adapter';

const exec = util.promisify(childProcess.exec);

export class ShellTerminalAdapter implements ITerminalAdapter {
  constructor(private log: ILogAdapter) {}

  async runCommand(command: string): Promise<string> {
    try {
      const execResult: IExecResult = await exec(command);

      if (execResult.stderr) {
        this.log.error(`stderr: ${execResult.stderr}`);
      }
      if (execResult.error) {
        this.log.error(`error: ${execResult.error.message}`);
      }

      this.log.debug(execResult.stdout);

      return execResult.stdout;
    } catch (err) {
      this.log.error(JSON.stringify(err));
      throw err;
    }
  }
}
