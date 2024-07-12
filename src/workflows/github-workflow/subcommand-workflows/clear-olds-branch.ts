import { ILogAdapter } from '../../../adapters/log-adapter/interface-log-adapter';
import { ITerminalAdapter } from '../../../adapters/terminal-adapter/interface-terminal-adapter';
import { IDependenciesFactory } from '../../../factories/dependencies-factory';
import { CommandParamsHelper } from '../../../helpers/command-params-helper';
import { PromptQuestionHelper } from '../../../helpers/prompt-question-helper';
import { IBaseSubcommandWorkflow } from '../../interface-base-subcommand-workflow';

export class ClearOldsBranch implements IBaseSubcommandWorkflow {
    private logAdapter: ILogAdapter;
    private terminalAdapter: ITerminalAdapter;
    private commandParamsHelper: CommandParamsHelper;
    private promptQuestionHelper: PromptQuestionHelper;
    private constructor(dependenciesFactory: IDependenciesFactory) {
        this.logAdapter = dependenciesFactory.logAdapter;
        this.terminalAdapter = dependenciesFactory.terminalAdapter;
        this.commandParamsHelper = dependenciesFactory.commandParamsHelper;
        this.promptQuestionHelper = dependenciesFactory.promptQuestionHelper;
    }

    getDocumentation(): string {
        return 'help text';
    }

    async execute() {
        const branchByTerminal = await this.terminalAdapter.runCommand(`
            cd ${this.commandParamsHelper.get('--folder-called')} \
            && git branch --list
        `);
        const {branchListAvailable, branchListDefault} = this.getBranchLists(branchByTerminal);

        if (branchListAvailable.length < 1) {
            this.logAdapter.error('Não existe uma lista de branch disponivel, faça uma validação');
            return;
        }

        const branchListToDelete = await this.promptQuestionHelper.questionWithCheckBox('Escolha quais branch vão ser deletadas, a opção all manterá a branch em que você está para não ter conflitos, caso exista mais de uma que não deseja deletar, use o parametro --branch-defaults', branchListAvailable.concat(`all, execto: ${branchListDefault.join(',')}`));
    
        const commandDeleteBranch = branchListToDelete.map(branch => `git branch -d ${branch}`);
        this.logAdapter.info(commandDeleteBranch.join(' && '))
        await this.terminalAdapter.runCommand(`
            cd ${this.commandParamsHelper.get('--folder-called')} \
            && ${commandDeleteBranch.join(' && ')}
        `);
    }

    private getBranchLists(branchByTerminal: string) {
        let branchListDefault: Array<string> = [];

        if (this.commandParamsHelper.exists('--branch-defaults')) {
            branchListDefault = this.commandParamsHelper.get('--branch-defaults').split(',');
        }
        else {
            const regexDefault = /\*\s+(\S+)/g;
            const valueRegexDefault = branchByTerminal.match(regexDefault) as Array<string>;
            const regexNameDefault = /(?!\*(\s+))(\S+)/g;
            branchListDefault = valueRegexDefault[0].match(regexNameDefault) as Array<string>;
        }

        const regexString = `\\b(?!(?:${branchListDefault.join('|')})\\b)[^*\\s]+\\b`;
        const regex = new RegExp(regexString, 'g');
        const branchListAvailable = branchByTerminal.match(regex) as Array<string>;

        return {
            branchListDefault,
            branchListAvailable,
        }
    }
}