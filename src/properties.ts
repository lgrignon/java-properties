/*
 * Licensed under the MIT license.
 */

'use strict';

// Construct a PropertiesFile class to handle all properties of a specifice file or group of file
class PropertiesFile {
    private entries: { [key: string]: string };

    constructor() {
        this.entries = {};
    }

    private makeKeys(line: string): void {
        if (line == null) {
            return;   
        }
        
        line = line.trim();
        if (line.length > 0 && line.indexOf('#') !== 0) {
            var splitIndex = line.indexOf('=');
            var key = line.substring(0, splitIndex).trim();
            var value = line.substring(splitIndex + 1).trim();
            this.entries[key] = value;
        }
    }

    public addContent(propertiesContent: string): void {
        var items = propertiesContent.split(/\r?\n/);
        for (var i = 0; i < items.length; i++) {
            this.makeKeys(items[i]);
        }
    }

    public addFileFromPath(path: string): boolean {
        try {
            var req = new XMLHttpRequest();
            req.open('GET', path, false);

            req.onload = (event: Event) => {
                var propertiesContent: string = req.responseText;
                this.addContent(propertiesContent);
            };
            req.onerror = (err: ErrorEvent) => {
                throw err;
            };

            req.send();
            return true;
        } catch (e) {
            console.error('cannot load ' + path, e);
            return false;
        }
    }

    public get(key: string, defaultValue: any = null): any {
        if (this.entries.hasOwnProperty(key)) {
            return typeof this.entries[key] === 'undefined' ? '' : this.interpolate(this.entries[key]);
        }
        return defaultValue;
    }

    public getInt(key: string, defaultIntValue: number = null): number {
        var val = this.get(key);
        if (!val) { return defaultIntValue; }
        else { return parseInt(val, 10); }
    }

    public getFloat(key: string, defaultFloatValue: number = null): number {
        var val = this.get(key);
        if (!val) { return defaultFloatValue; }
        else { return parseFloat(val); }
    }

    public getBoolean(key: string, defaultBooleanValue: boolean = false): boolean {
        var val = this.get(key);
        if (!val) { return defaultBooleanValue || false; }
        else { return this.parseBool(val); }
    }

    private parseBool(b): boolean {
        return !(/^(false|0)$/i).test(b) && !!b;
    }

    public set(key: string, value: any): void {
        this.entries[key] = value;
    }

    public interpolate(s: string): string {
        return s
            .replace(/\\\\/g, '\\')
            .replace(/\$\{([A-Za-z0-9\.]*)\}/g,(match: string) => {
            return this.get(match.substring(2, match.length - 1));
        });
    }

    public getKeys(): string[] {
        var keys: string[] = [];
        for (var key in this.entries) {
            keys.push(key);
        }
        return keys;
    }

    public getEntries(): { [key: string]: string } {
        return this.entries;
    }

    public reset(): void {
        this.entries = {};
    }

    public static fromFilePath(path: string): PropertiesFile {
        var props = new PropertiesFile();
        props.addFileFromPath(path);
        return props;
    }

    public static fromContent(content: string): PropertiesFile {
        var props = new PropertiesFile();
        props.addContent(content);
        return props;
    }
}
