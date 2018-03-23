"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");

var Linter = function () {
    function Linter() {
        _classCallCheck(this, Linter);

        /** The files the linter needs to run over. */
        this.files = [];
    }
    /**
     * Lint all files, report any issues and exit with a success or failure code.
     */


    _createClass(Linter, [{
        key: "run",
        value: function run(output) {
            var _this = this;

            var files = this.files,
                parser = this.parser,
                reporter = this.reporter,
                validator = this.validator;

            var results = [];
            return new Promise(function (resolve, reject) {
                if (!_this.filesAreSwagger()) {
                    return reject(new Error('File(s) are not swagger documents'));
                }
                Promise.all(files.map(function (file) {
                    return validator.getIssues(file);
                })).then(function (validateIssues) {
                    Promise.all(files.map(function (file, index) {
                        return parser.locateIssues(file, validateIssues[index]);
                    })).then(function (locatedIssues) {
                        files.forEach(function (file, index) {
                            var issues = locatedIssues[index];
                            if (issues.length > 0) {
                                output.write(reporter.reportIssues(file, issues) + "\n");
                            }
                            results.push({ file: file, issues: issues });
                        });
                        resolve(results);
                    }).catch(reject);
                }).catch(reject);
            });
        }
        /**
         * Add a (new) file, from file source, to the linter for validating.
         */

    }, {
        key: "addFile",
        value: function addFile(source) {
            this.files.push(new file_1.File(source));
            return this;
        }
        /**
         * Set the name of the parser to locate issues with.
         * This will lazy load the parser and set it to this instance.
         */

    }, {
        key: "setParser",
        value: function setParser(name) {
            this.parser = this.createExternalModule(name, './parsers/');
            return this;
        }
        /**
         * Set the reporter to use when reporting issues.
         * This will lazy load the reporter and set it to this instance.
         */

    }, {
        key: "setReporter",
        value: function setReporter(name) {
            this.reporter = this.createExternalModule(name, './reporters/');
            return this;
        }
        /**
         * Set the validator to use when linting.
         * This will lazy load the parser and set it to this instance.
         */

    }, {
        key: "setValidator",
        value: function setValidator(name) {
            this.validator = this.createExternalModule(name, './validators/');
            return this;
        }
        /**
         * Lazy load an external module and return the default export from that module.
         */

    }, {
        key: "createExternalModule",
        value: function createExternalModule(name) {
            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            var contents = require("" + path + name);
            if (contents && contents.default) {
                return new contents.default();
            }
            throw new Error("Could not initiate external module \"" + path + name + "\".");
        }
        /**
         * Determine if all files are swagger.
         */

    }, {
        key: "filesAreSwagger",
        value: function filesAreSwagger() {
            return this.files.every(function (file) {
                return file.isSwagger();
            });
        }
    }]);

    return Linter;
}();

exports.Linter = Linter;