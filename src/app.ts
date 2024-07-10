import { DependenciesFactory } from './factories/dependencies-factory';
import { CommandWorkflows } from './workflows';

class App {
    private readonly command: string;
    private readonly subcommand: string;
    constructor(processArgs: Array<string>) {
        this.command = processArgs[2] || '';
        this.subcommand = processArgs[3] || '';       
    }
    async execute() {
        if (this.command.length < 1 || this.subcommand.length < 1) {
            throw new Error('Command and subcommand is required');
        }
        const command = new CommandWorkflows[this.command](this.subcommand, DependenciesFactory.setup());
        await command.execute();
    }
}
new App(process.argv).execute();