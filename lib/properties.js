/*
 * Licensed under the MIT license.
 */
'use strict';
// Construct a PropertiesFile class to handle all properties of a specifice file or group of file
var PropertiesFile = (function () {
    function PropertiesFile() {
        this.entries = {};
    }
    PropertiesFile.prototype.makeKeys = function (line) {
        if (line && line.indexOf('#') !== 0) {
            var splitIndex = line.indexOf('=');
            var key = line.substring(0, splitIndex).trim();
            var value = line.substring(splitIndex + 1).trim();
            // if keys already exists ...
            if (this.entries.hasOwnProperty(key)) {
                // if it is already an Array
                if (Array.isArray(this.entries[key])) {
                    // just push the new value
                    this.entries[key].push(value);
                }
                else {
                    // transform the value into Array
                    var oldValue = this.entries[key];
                    this.entries[key] = [oldValue, value];
                }
            }
            else {
                // the key does not exists
                this.entries[key] = value;
            }
        }
    };
    PropertiesFile.prototype.addContent = function (propertiesContent) {
        var items = propertiesContent.split(/\r?\n/);
        for (var i = 0; i < items.length; i++) {
            this.makeKeys(items[i]);
        }
    };
    PropertiesFile.prototype.addFileFromPath = function (path) {
        var _this = this;
        var req = new XMLHttpRequest();
        req.open('GET', path, false);
        req.onload = function (event) {
            var propertiesContent = req.responseText;
            _this.addContent(propertiesContent);
        };
        req.onerror = function (err) {
            throw err;
        };
        req.send();
    };
    PropertiesFile.prototype.get = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (this.entries.hasOwnProperty(key)) {
            if (Array.isArray(this.entries[key])) {
                var ret = [];
                for (var i = 0; i < this.entries[key].length; i++) {
                    ret[i] = this.interpolate(this.entries[key][i]);
                }
                return ret;
            }
            else {
                return typeof this.entries[key] === 'undefined' ? '' : this.interpolate(this.entries[key]);
            }
        }
        return defaultValue;
    };
    PropertiesFile.prototype.getInt = function (key, defaultIntValue) {
        if (defaultIntValue === void 0) { defaultIntValue = null; }
        var val = this.get(key);
        if (!val) {
            return defaultIntValue;
        }
        else {
            return parseInt(val, 10);
        }
    };
    PropertiesFile.prototype.getFloat = function (key, defaultFloatValue) {
        if (defaultFloatValue === void 0) { defaultFloatValue = null; }
        var val = this.get(key);
        if (!val) {
            return defaultFloatValue;
        }
        else {
            return parseFloat(val);
        }
    };
    PropertiesFile.prototype.getBoolean = function (key, defaultBooleanValue) {
        if (defaultBooleanValue === void 0) { defaultBooleanValue = false; }
        var val = this.get(key);
        if (!val) {
            return defaultBooleanValue || false;
        }
        else {
            return this.parseBool(val);
        }
    };
    PropertiesFile.prototype.parseBool = function (b) {
        return !(/^(false|0)$/i).test(b) && !!b;
    };
    PropertiesFile.prototype.set = function (key, value) {
        this.entries[key] = value;
    };
    PropertiesFile.prototype.interpolate = function (s) {
        var _this = this;
        return s.replace(/\\\\/g, '\\').replace(/\$\{([A-Za-z0-9\.]*)\}/g, function (match) {
            return _this.get(match.substring(2, match.length - 1));
        });
    };
    PropertiesFile.prototype.getKeys = function () {
        var keys = [];
        for (var key in this.entries) {
            keys.push(key);
        }
        return keys;
    };
    PropertiesFile.prototype.reset = function () {
        this.entries = {};
    };
    PropertiesFile.fromFilePath = function (path) {
        var props = new PropertiesFile();
        props.addFileFromPath(path);
        return props;
    };
    PropertiesFile.fromContent = function (content) {
        var props = new PropertiesFile();
        props.addContent(content);
        return props;
    };
    return PropertiesFile;
})();
