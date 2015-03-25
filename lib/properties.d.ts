declare class PropertiesFile {
    private entries;
    constructor();
    makeKeys(line: any): void;
    addContent(propertiesContent: string): void;
    addFileFromPath(path: string): void;
    get(key: string, defaultValue?: any): any;
    getInt(key: string, defaultIntValue?: number): number;
    getFloat(key: string, defaultFloatValue?: number): number;
    getBoolean(key: string, defaultBooleanValue?: boolean): boolean;
    private parseBool(b);
    set(key: string, value: any): void;
    interpolate(s: string): string;
    getKeys(): string[];
    getEntries(): {
        [key: string]: any;
    };
    reset(): void;
    static fromFilePath(path: string): PropertiesFile;
    static fromContent(content: string): PropertiesFile;
}
