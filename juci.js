var  exec = require('child_process').exec;
var  child = exec('uci export wireless', function (error, stdout, stderr) {
    console.log('stdout: ' +  stdout);
    console.log('stderr: ' +  stderr);
    if (error !== null) {
      console.log('exec error: ' +  error);
    }
});

function uci(cmdArgs, callback) {
    var  child = exec('uci ' + cmdArgs, function (error, stdout, stderr) {
        console.log('stdout: ' +  stdout);
        console.log('stderr: ' +  stderr);
        if (error !== null) {
          console.log('exec error: ' +  error);
        }
    });
}

var juci = {
    batch: null,
    export: null,
    import: null,
    changes: null,
    commit: null,
    add: null,
    add_list: null,
    del_list: null,
    show: null,
    get: null,
    set: null,
    delete: null,
    rename: null,
    revert: null,
    reorder: null
};

juci.export = function (config, callback) {
    var cmdArgs = '';

    if (typeof config === 'function') {
        callback = config;
        config = undefined;
    }

    if (config)
        cmdArgs = config;

    return uci(cmdArgs, callback);
};

juci.commit = function (config, callback) {
    // config: option
};

juci.batch = function (callback) {
};

juci.import = function (config, callback) {
};

juci.changes = function (config, callback) {
};

juci.add = function (config, sectionType, callback) {
};

juci.addList = function (config, section, option, value, callback) {
};

juci.show = function (config, section, option, callback) {
};

// juci.showOption = function (config, section, option, callback) {
// };

// juci.showSection = function (config, section, option, callback) {
// };

// juci.showConfig = function (config, section, option, callback) {
// };

juci.get = function (config, section, option, callback) {
};

// juci.getOption = function (config, section, option, callback) {
// };

// juci.getSectionType = function (config, section, option, callback) {
// };

juci.set = function (config, section, option, value, callback) {
};

// juci.setOption = function (config, section, option, value, callback) {
// };

// juci.newSection = function (config, section, option, value, callback) {
// };

juci.delete = function (config, section, option, callback) {
};

// juci.deleteSection = function (config, section, option, callback) {
// };

// juci.deleteOption = function (config, section, option, callback) {
// };

juci.rename = function (config, section, option, name, callback) {
};

// juci.renameSection = function (config, section, name, callback) {
// };

// juci.renameOption = function (config, section, option, name, callback) {
// };

juci.revert = function (config, section, option, name, callback) {
};

// juci.revertConfig = function (config, name, callback) {
// };

// juci.revertSection = function (config, section, name, callback) {
// };

// juci.revertOption = function (config, section, option, name, callback) {
// };


