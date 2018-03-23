/// <reference types="node" />
import { File, FileSource } from './file';
import { Issue } from './issue';
export interface LinterResult {
    /** The file that has been linted. */
    file: File;
    /** All issues encoutered within that file. */
    issues: Issue[];
}
export declare class Linter {
    /** The parser instance to analyse the source code with. */
    private parser;
    /** The reporter to use for reporting issues. */
    private reporter;
    /** The syntax validator for the source code. */
    private validator;
    /** The files the linter needs to run over. */
    private files;
    /**
     * Lint all files, report any issues and exit with a success or failure code.
     */
    run(output: NodeJS.WritableStream): Promise<LinterResult[]>;
    /**
     * Add a (new) file, from file source, to the linter for validating.
     */
    addFile(source: FileSource): Linter;
    /**
     * Set the name of the parser to locate issues with.
     * This will lazy load the parser and set it to this instance.
     */
    setParser(name: string): Linter;
    /**
     * Set the reporter to use when reporting issues.
     * This will lazy load the reporter and set it to this instance.
     */
    setReporter(name: string): Linter;
    /**
     * Set the validator to use when linting.
     * This will lazy load the parser and set it to this instance.
     */
    setValidator(name: string): Linter;
    /**
     * Lazy load an external module and return the default export from that module.
     */
    private createExternalModule(name, path?);
    /**
     * Determine if all files are swagger.
     */
    private filesAreSwagger();
}
