import { IBaseSubcommandWorkflow } from "./interface-base-subcommand-workflow";

export interface IBaseCommandWorkflow {
    subcommandWorkflow: IBaseSubcommandWorkflow;
    commandTextHelper: string;
}