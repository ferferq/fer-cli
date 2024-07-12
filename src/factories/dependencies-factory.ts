import { ConsoleLogAdapter } from "../adapters/log-adapter/console-log-adapter"
import { ILogAdapter } from "../adapters/log-adapter/interface-log-adapter";
import { ITerminalAdapter } from "../adapters/terminal-adapter/interface-terminal-adapter";
import { ShellTerminalAdapter } from "../adapters/terminal-adapter/shell-terminal-adapter";
import { CommandParamsHelper } from "../helpers/command-params-helper";
import { PromptQuestionHelper } from "../helpers/prompt-question-helper";

export interface IDependenciesFactory {
    logAdapter: ILogAdapter,
    terminalAdapter: ITerminalAdapter,
    commandParamsHelper: CommandParamsHelper;
    promptQuestionHelper: PromptQuestionHelper;
}

export class DependenciesFactory {
    static create(processArgs: Array<string>): IDependenciesFactory {
        const logAdapter = new ConsoleLogAdapter();
        const terminalAdapter = new ShellTerminalAdapter(logAdapter);
        const commandParamsHelper = new CommandParamsHelper(processArgs);
        const promptQuestionHelper = new PromptQuestionHelper(logAdapter);

        return {
            logAdapter,
            terminalAdapter,
            commandParamsHelper,
            promptQuestionHelper,
        }
    }
}