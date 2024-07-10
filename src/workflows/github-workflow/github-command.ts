import { IDependenciesFactory } from "../../factories/dependencies-factory";
import { CommandWorkflow } from "../base-command-workflow";
import { Subcommands } from './subcommand-workflows';

export class GithubCommand extends CommandWorkflow {
  constructor(subcommand: string, dependenciesFactory: IDependenciesFactory) {
    const subcommandWorkflow = new Subcommands[subcommand](dependenciesFactory);
    super(
      subcommand,
      {
        commandTextHelper: '',
        subcommandWorkflow,
      },
      dependenciesFactory
    );
  }
}