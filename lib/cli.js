"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var concatStream = require("concat-stream");
var linter_1 = require("./linter");
// tslint:disable-next-line no-var-requires
var pkg = require('../package.json');
var terminal = process.stdout;
program.version(pkg.version).usage('<file ...> [options]').option('-p, --parser [name]', 'Parser\'s [name] to locate issues within the source', 'yaml').option('-r, --reporter [name]', 'Reporter\'s [name] to format and report all encountered issues', 'stylish').option('-v, --validator [name]', 'Validator\'s [name] to validate the swagger syntax', 'sway').option('--stdin', 'If the linter should use STDIN instead of files').option('--stdin-filename [name]', 'The filename to use when validating from STDIN');
program.on('--help', function () {
    var lines = ['  Examples:', '', '    $ swaglint swagger.yml', '    $ swaglint partial.yml other.yml', '    $ cat cool-api.yml | swaglint --stdin', ''];
    lines.forEach(function (line) {
        return terminal.write(line + "\n");
    });
});
program.parse(process.argv);
var linter = new linter_1.Linter().setParser(program.parser).setReporter(program.reporter).setValidator(program.validator);
if (program.stdin) {
    process.stdin.pipe(concatStream({ encoding: 'string' }, function (contents) {
        linter.addFile({ contents: contents, path: program.stdinFilename }).run(terminal).catch(function (message) {
            return terminal.write(message + "\n");
        });
    }));
} else if (program.args.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = program.args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var path = _step.value;

            linter.addFile({ path: path });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    linter.run(terminal).catch(function (message) {
        return terminal.write(message + "\n");
    });
} else {
    program.help();
}