declare class PropertiesFile {
    private entries;
    constructor();
    private makeKeys(line);
    addContent(propertiesContent: string): void;
    addFileFromPath(path: string): boolean;
    get(key: string, defaultValue?: any): any;
    getInt(key: string, defaultIntValue?: number): number;
    getFloat(key: string, defaultFloatValue?: number): number;
    getBoolean(key: string, defaultBooleanValue?: boolean): boolean;
    private parseBool(b);
    set(key: string, value: any): void;
    interpolate(s: string): string;
    getKeys(): string[];
    getEntries(): {
        [key: string]: string;
    };
    reset(): void;
    static fromFilePath(path: string): PropertiesFile;
    static fromContent(content: string): PropertiesFile;
}
