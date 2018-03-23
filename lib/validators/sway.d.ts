import { File } from '../file';
import { Issue } from '../issue';
import { Validator } from '../validator';
export default class SwayValidator implements Validator {
    /**
     * @inheritdoc
     */
    getIssues(file: File): Promise<Issue[]>;
    /**
     * Create a new plain object from the file's contents.
     */
    private createDocument(file);
    /**
     * Create an issue object from the encountered sway validation entry.
     */
    private issueFromEntry(type, entry, parent?);
    /**
     * Merge the parent and child issue path to create an absolute reference to the issue.
     */
    private mergeParentPath(parentPath, childPath);
    /**
     * Get a list of all unique issues from the issue list.
     * Sway has a tendency to overreact to JSON schema failures, so we **SHOULD** filter them.
     */
    private filterExcessiveIssues(issues);
    /**
     * Flatten the nestable issues to a flat issue array.
     */
    private flattenNestedIssues(nestedIssues);
}
