import { IDependenciesFactory } from "../factories/dependencies-factory";
import { IBaseSubcommandWorkflow } from "./interface-base-subcommand-workflow";

type ConstructorBaseSubcommand<T> = new (dependencies: IDependenciesFactory) => T;

export interface IBaseCommandWorkflow {
    commandName: string;
    subcommandWorkflows: Record<string, ConstructorBaseSubcommand<IBaseSubcommandWorkflow>>;
    commandTextHelper: string;
}