import { DependenciesFactory } from './factories/dependencies-factory';
import { Workflows } from './workflows';
import { CommandWorkflow } from './workflows/base-command-workflow';

class App {
    private readonly command: string;
    private readonly subcommand: string;
    private readonly processArgs: Array<string>;
    constructor(processArgs: Array<string>) {
        this.command = processArgs[2] || '';
        this.subcommand = processArgs[3] || '';  
        this.processArgs = processArgs;     
    }
    async execute() {
        const dependencies = DependenciesFactory.create(this.processArgs);
        const { logAdapter } = dependencies;

        if (this.command === 'help') {
            logAdapter.info('help principal');
            return;
        }

        const commandWorkflowProps = Workflows[this.command];

        if (!commandWorkflowProps) {
            logAdapter.error('command not exist, to verify all commands, use fer-cli help');
            return;
        }

        const commandWorkflow = new CommandWorkflow(this.subcommand, commandWorkflowProps, dependencies);
        await commandWorkflow.execute();
    }
}
new App(process.argv).execute();