import { ConsoleLogAdapter } from "../adapters/log-adapter/console-log-adapter"
import { ILogAdapter } from "../adapters/log-adapter/interface-log-adapter";
import { ITerminalAdapter } from "../adapters/terminal-adapter/interface-terminal-adapter";
import { ShellTerminalAdapter } from "../adapters/terminal-adapter/shell-terminal-adapter";

export interface IDependenciesFactory {
    logAdapter: ILogAdapter,
    terminalAdapter: ITerminalAdapter,
}

export class DependenciesFactory {
    static setup() {
        const logAdapter = new ConsoleLogAdapter();
        const terminalAdapter = new ShellTerminalAdapter(logAdapter);

        return {
            logAdapter,
            terminalAdapter,
        }
    }
}