export interface ITerminalAdapter {
    runCommand(command: string): Promise<string>;
}