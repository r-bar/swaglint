import { File } from '../file';
import { Issue } from '../issue';
import { Reporter } from '../reporter';
export default class StylishReporter implements Reporter {
    /**
     * @inheritdoc
     */
    reportIssues(file: File, issues: Issue[]): string;
    private headerFromFile(file);
    private issueTypeColor(issue);
    private rowFromIssue(issue);
    private tableFromRows(rows);
    private correctIssueLocations(table);
}
