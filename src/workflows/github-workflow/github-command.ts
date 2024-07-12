import { IBaseCommandWorkflow } from "../interface-base-command-workflow";
import { ClearOldsBranch } from "./subcommand-workflows";

export const GithubCommandWorkflow: Record<string, IBaseCommandWorkflow> = {
  'github': {
    commandName: 'github',
    commandTextHelper: 'help github',
    subcommandWorkflows: {
      'clear-olds-branch': ClearOldsBranch as any,
    }
  }
}