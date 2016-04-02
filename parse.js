var fs = require('fs');

var cfgParser = {
    prevToken: null,
    state: null,
    changeState: function (s) {
        this.state = s;
    },
    read: function (token) {
        switch(this.state) {
            case 'sec-type':
                var currentEntryIndex;
                // create a section type if none
                if (!this.data[token])
                    this.data[token] = [];

                // Create a new entry in this section type
                this.data[token].push({});
                currentEntryIndex = this.data[token].length - 1;
                this.ptr = this.data[token][currentEntryIndex];
                this.ptr.sec_name = null;
                cfgParser.changeState('sec-name');
                break;
            case 'sec-name':
                this.ptr.sec_name = token;
                break;
            case 'option-key':
                // save the key for next value reading
                this.prevToken = token;
                // create the property
                this.ptr[token] = null;
                cfgParser.changeState('option-value');
                break;
            case 'option-value':
                // save the value
                this.ptr[this.prevToken] = token;
                break;
            case 'list-key':
                this.prevToken = token;
                this.ptr[token] = this.ptr[token] || [];
                // this.ptr = this.data[token];
                cfgParser.changeState('list-value');
                break;
            case 'list-value':
                // console.log(this.ptr);
                if (this.ptr[this.prevToken])
                    this.ptr[this.prevToken].push(token);
                break;
        }
    },
    ptr: null,
    data: {}
};

fs.readFile(__dirname + '/cfg/firewall', 'utf8', function (err, data) {
    if (err) throw err;

    // pre-process the read data
    data = data.replace(/\t/g, '');
    data = data.replace(/\n/g, ' ');
    data = data.replace(/'/g, '');
    data = data.split(' ');

    if (data[0] === '')
        data.shift();

    // state machine
    data.forEach(function (token, i) {
        if (token === 'config')
            cfgParser.changeState('sec-type');
        else if (token === 'option')
            cfgParser.changeState('option-key');
        else if (token === 'list')
            cfgParser.changeState('list-key');
        else
            cfgParser.read(token);
    });

    console.log(JSON.stringify(cfgParser.data));
});
