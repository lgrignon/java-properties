# java-properties

Read Java .properties files from different sources. Supports adding dynamically some files and array key value (same key multiple times)

## Getting Started
Install the module with: `bower install java-properties`

## Documentation
```javascript
    var values = PropertiesFile.fromFilePath('messages/default.properties');

    //Read a value from the properties file
    values.get('a.key'); //returns value of a.key

    //Add an additional file's properties
    values.addFileFromPath('anotherfile.properties');

    //Clear out all values
    values.reset();
    ...
    // returns the value of a.key of 'defaultValue' if key is not found
    values.get('a.key', 'defaultValue');
    ...
    // returns the value of the a.int.key as an int or 18
    values.getInt('a.int.key', 18);
    ...
    // returns the value of the a.float.key as a float or 18.23
    values.getFloat('a.float.key', 18.23);
    ...
    // returns the value of the a.bool.key as an boolean. Parse true or false with any case or 0 or 1
    values.getBoolean('a.bool.key', true);
    ...
    // returns all the keys
    values.getKeys();
    ...
    // empty the keys previously loaded
    values.reset();
    ...
    [ -- .properties file
    an.array.key=value1
    an.array.key=value2
    ]
    values.get('an.array.key'); // returns [value1, value2]
    
    // Multiple contexts
    var myFile = PropertiesFile.fromFilePath('example.properties');
    myFile.addFileFromPath('example2.properties');
    myFile.addFileFromContent('my.prop = test\nmy.other.prop = toto');
```

## Release History
0.1.3 Trim keys and values + override entries if newer added<br />
0.1.2 Do not crash if file could not be loaded <br />
0.1.1 Fixed documentation + PropertiesFile.getEntries <br />
0.1.0 Initial commit (forked from https://github.com/mattdsteele/java-properties)

## License
Licensed under the MIT license.
