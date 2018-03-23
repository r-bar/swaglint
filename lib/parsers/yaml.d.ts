import { File } from '../file';
import { Issue } from '../issue';
import { Parser } from '../parser';
export default class YamlParser implements Parser {
    /**
     * @inheritdoc
     */
    locateIssues(file: File, issues: Issue[]): Promise<Issue[]>;
    /**
     * Create a new abstract syntax tree from the file's contents.
     */
    private createTree(file);
    /**
     * Try to find the issue within the abstract syntax tree.
     * If an exact location was found, the location **MUST** be attached to the issue.
     */
    private resolveLocation(issue, node);
    /**
     * Try to locate the encountered issue within the document using the YAML AST.
     * This is heavily inspired by the Atom Linter Swagger project.
     *
     * @see https://github.com/AtomLinter/linter-swagger
     */
    private findIssueInTree(issue, path, node);
    /**
     * Get the exact issue location from a single YAML AST node.
     */
    private locationFromTree(node);
}
