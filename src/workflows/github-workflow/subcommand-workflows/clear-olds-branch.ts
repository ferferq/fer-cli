import { ILogAdapter } from '../../../adapters/log-adapter/interface-log-adapter';
import { ITerminalAdapter } from '../../../adapters/terminal-adapter/interface-terminal-adapter';
import { IDependenciesFactory } from '../../../factories/dependencies-factory';
import { IBaseSubcommandWorkflow } from '../../interface-base-subcommand-workflow';

export class ClearOldsBranch implements IBaseSubcommandWorkflow {
    private logAdapter: ILogAdapter;
    private terminalAdapter: ITerminalAdapter;
    constructor(dependenciesFactory: IDependenciesFactory) {
        this.logAdapter = dependenciesFactory.logAdapter;
        this.terminalAdapter = dependenciesFactory.terminalAdapter;
    }

    getDocumentation(): string {
        return 'help text';
    }

    async execute() {
        const result = await this.terminalAdapter.runCommand('git branch --list');
        this.logAdapter.info(`response ${JSON.stringify(result)}`);
    }

}