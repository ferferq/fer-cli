export interface IBaseSubcommandWorkflow {
    getDocumentation(): string;
    execute(): Promise<void>;
}