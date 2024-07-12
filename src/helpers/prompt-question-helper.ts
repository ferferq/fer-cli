import readline from 'readline';
import { ILogAdapter } from '../adapters/log-adapter/interface-log-adapter';

export class PromptQuestionHelper {
    constructor(private log: ILogAdapter) {}

    // Função para limpar o console
    private clearConsole = () => process.stdout.write('\x1bc');

    questionWithCheckBox(question: string, choices: Array<string>, enableCheckBoxAll = false): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.clearConsole();
            const marked = new Array(choices.length).fill(false);
            let currentIndex = 0;

            if (enableCheckBoxAll) {
                marked.push('all');
            }
        
            const printChoices = () => {
                this.log.info(question);
                this.log.info('Press Space to select an option, Enter to confirm:');
              choices.forEach((choice, index) => {
                const checkbox = marked[index] ? '[x]' : '[ ]';
                const line = `${checkbox} ${choice}`;
                if (index === currentIndex) {
                  console.log('\x1b[36m%s\x1b[0m', line); // Highlight current option
                } else {
                    this.log.info(line);
                }
              });

            };
        
            printChoices();
        
            const handleKeyPress = (str: any, key: any) => {
              if (key.ctrl && key.name === 'c') {
                reject(new Error('User aborted'));
                cleanup();
                return;
              }
              if (key.name === 'down' && currentIndex < choices.length - 1) {
                currentIndex++;
                this.clearConsole();
                printChoices();
              } else if (key.name === 'up' && currentIndex > 0) {
                currentIndex--;
                this.clearConsole();
                printChoices();
              } else if (key.name === 'space') {
                if (marked[currentIndex] === 'All') {

                } else {
                    marked[currentIndex] = !marked[currentIndex];
                }
                this.clearConsole();
                printChoices();
              } else if (key.name === 'return') {
                cleanup();
                const selectedChoices = choices.filter((_, index) => marked[index]);
                resolve(selectedChoices);
              }
            };
        
            const cleanup = () => {
              readline.emitKeypressEvents(process.stdin);
              process.stdin.removeListener('keypress', handleKeyPress);
              readline.cursorTo(process.stdout, 0, choices.length + 3);
              process.stdin.setRawMode(false);
              process.stdin.pause();
            };
        
            readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.on('keypress', handleKeyPress);
          });
    }
}