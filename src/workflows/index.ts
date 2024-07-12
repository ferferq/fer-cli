import { GithubCommandWorkflow } from "./github-workflow/github-command";
import { IBaseCommandWorkflow } from "./interface-base-command-workflow";

export const Workflows: Record<string, IBaseCommandWorkflow> = {
    ...GithubCommandWorkflow,
}