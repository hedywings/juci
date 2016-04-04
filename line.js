var fs = require('fs');

fs.readFile(__dirname + '/cfg/dhcp', 'utf8', function (err, data) {
    if (err) throw err;

    // pre-process the read data
    data = data.replace(/\t/g, '');
    // data = data.replace(/\n\n/g, ' ');
    // data = data.replace(/\n/g, ' ');
    // data = data.replace(/'/g, '');
    //console.log(data);
    data = data.split('\n');

    // if (data[0] === '')
    //     data.shift();

    // if (data[data.length - 1] === '')
    //     data.pop();

    console.log(data);
    // state machine
    // data.forEach(function (token, i) {
    //     if (token === 'config')
    //         cfgParser.changeState('sec-type');
    //     else if (token === 'option')
    //         cfgParser.changeState('option-key');
    //     else if (token === 'list')
    //         cfgParser.changeState('list-key');
    //     else
    //         cfgParser.read(token);
    // });

    // console.log(cfgParser.data);

    parseLines(data);
});

function parseLines(lines) {
    var opt = {};
    lines.forEach(function (line) {
        var items = line.split(' '),
            head = items[0];

        if (head === '') {
            return;
        } else if (head === 'config') {
            parseConfig(items);
        } else if (head === 'option') {
            //;
            var optx = parseOption(items);
            Object.assign(opt, optx);
            // console.log();
        } else if (head === 'list') {
            parseList(items);
        }
    });
    console.log(opt);
}

function parseConfig(items) {
    var len = items.length;

    if (len === 2)
        return {
            section_type: items[1]
        };
    else if (len === 3)
        return {
            section_type: items[1],
            section_name: items[2]
        };
}

function parseOption(items) {
    var opt = {},
        key = items[1],
        value = items[2],
        numVal;

    if (typeof value === 'string')
        value = value.replace(/'/g, '');
 
    numVal = parseInt(value);
    console.log(value);
    console.log(numVal);        // '12h' will be pared to number, but it's string

    if (isNaN(numVal))
        numVal = parseFloat(value);

    value = isNaN(numVal) ? value : numVal;

    console.log(typeof value);
    opt[key] = value;

    return opt;
}