# java-properties

Read Java .properties files from different sources. Supports adding dynamically some files and array key value (same key multiple times)

## Getting Started
Install the module with: `bower install java-properties`

## Documentation
```javascript
    var properties = require('java-properties');

    var values = properties.of('values.properties');

    //Read a value from the properties file
    values.get('a.key'); //returns value of a.key

    //Add an additional file's properties
    values.add('anotherfile.properties');

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
    // adds another file the properties list
    values.addFile('anotherFile.properties');
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
    var myFile = new PropertiesFile(
        'example.properties',
        'arrayExample.properties');
    myFile.get('arrayKey');
    
    var myOtherFile = new PropertiesFile();
    myOtherFile.addFile('example.properties');
    myOtherFile.addFile('example2.properties');
```

## Release History
0.1.0 Initial commit (forked from https://github.com/mattdsteele/java-properties)

## License
Licensed under the MIT license.
