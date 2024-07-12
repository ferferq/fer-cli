import { ILogAdapter } from "../adapters/log-adapter/interface-log-adapter";
import { IDependenciesFactory } from "../factories/dependencies-factory";
import { IBaseCommandWorkflow } from "./interface-base-command-workflow";

export class CommandWorkflow {
    private logAdapter: ILogAdapter;
    constructor(private subcommand: string, private commandWorkflow: IBaseCommandWorkflow, private dependencies: IDependenciesFactory){
      this.logAdapter = this.dependencies.logAdapter;
    }

    private getDocumentation() {
        this.logAdapter.info(this.commandWorkflow.commandTextHelper);
    }

    async execute() {
      this.logAdapter.info(`start ${this.commandWorkflow.commandName} workflow`);

      if (this.subcommand == 'help') {
        this.getDocumentation();
        return;
      }

      const subcommand = new this.commandWorkflow.subcommandWorkflows[this.subcommand](this.dependencies);

      if (!subcommand) {
        this.logAdapter.error(`subcommand not exists, to verify all subcommands, use fer-cli ${this.commandWorkflow.commandName} help`);
        return;
      }

      // if (test) {
      //   subcommand.getDocumentation();
      // } else {
        await subcommand.execute();
      //}

      this.logAdapter.info('end github workflow');
    }
}