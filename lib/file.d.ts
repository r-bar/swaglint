export interface FileSource {
    /** The absolute file path, including name and extension */
    path: string;
    /** The contents of the file. */
    contents?: string;
}
export declare class File {
    /** The source of the file. */
    readonly source: FileSource;
    /**
     * Create a new file instance based on a file source.
     */
    constructor(source: FileSource);
    /**
     * The the full path and file name of the file.
     */
    getPath(): string;
    /**
     * Get the contents of the file, as string.
     */
    getContents(): string;
    /**
     * Determine if the file is a swagger specification.
     */
    isSwagger(): boolean;
}
