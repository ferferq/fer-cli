export interface ILogAdapter {
    setLevel(level: string): void;
    info(msg: string): void;
    debug(msg: string): void;
    error(msg: string): void;
}