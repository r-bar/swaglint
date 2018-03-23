import { File } from '../file';
import { Issue } from '../issue';
import { Reporter } from '../reporter';
export default class JsonReporter implements Reporter {
    /**
     * @inheritdoc
     */
    reportIssues(file: File, issues: Issue[]): string;
}
