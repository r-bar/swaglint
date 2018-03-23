import { File } from '../file';
import { Issue } from '../issue';
import { Reporter } from '../reporter';
export default class CompactReporter implements Reporter {
    /**
     * @inheritdoc
     */
    reportIssues(file: File, issues: Issue[]): string;
    /**
     * Get a simple formatted string that represents a single issue.
     */
    private rowFromIssue(file, issue);
}
