import { ILogAdapter } from "../adapters/log-adapter/interface-log-adapter";
import { IDependenciesFactory } from "../factories/dependencies-factory";
import { IBaseCommandWorkflow } from "./interface-base-command-workflow copy";

export abstract class CommandWorkflow {
    private logAdapter: ILogAdapter;
    constructor(private subcommand: string, private commandWorkflow: IBaseCommandWorkflow, dependenciesFactory: IDependenciesFactory){
      this.logAdapter = dependenciesFactory.logAdapter;
    }

    getDocumentation() {
        return this.commandWorkflow.commandTextHelper;
    }

    async execute() {
      this.logAdapter.info(`start github workflow subcommand ${this.subcommand}`);
      await this.commandWorkflow.subcommandWorkflow.execute();
      this.logAdapter.info('end github workflow');
    }
}