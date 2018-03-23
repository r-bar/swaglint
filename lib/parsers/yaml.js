"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var yaml_js_1 = require("yaml-js");
var tagTypes = {
    dictionary: 'tag:yaml.org,2002:map',
    list: 'tag:yaml.org,2002:seq'
};

var YamlParser = function () {
    function YamlParser() {
        _classCallCheck(this, YamlParser);
    }

    _createClass(YamlParser, [{
        key: "locateIssues",

        /**
         * @inheritdoc
         */
        value: function locateIssues(file, issues) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var tree = _this.createTree(file);
                var located = issues.map(function (issue) {
                    return _this.resolveLocation(issue, tree);
                });
                resolve(located);
            });
        }
        /**
         * Create a new abstract syntax tree from the file's contents.
         */

    }, {
        key: "createTree",
        value: function createTree(file) {
            return yaml_js_1.compose(file.getContents());
        }
        /**
         * Try to find the issue within the abstract syntax tree.
         * If an exact location was found, the location **MUST** be attached to the issue.
         */

    }, {
        key: "resolveLocation",
        value: function resolveLocation(issue, node) {
            var location = this.findIssueInTree(issue, issue.path, node);
            if (location) {
                issue.location = location;
            }
            return issue;
        }
        /**
         * Try to locate the encountered issue within the document using the YAML AST.
         * This is heavily inspired by the Atom Linter Swagger project.
         *
         * @see https://github.com/AtomLinter/linter-swagger
         */

    }, {
        key: "findIssueInTree",
        value: function findIssueInTree(issue, path, node) {
            if (node.tag === tagTypes.list) {
                var childNode = node.value[path[0]];
                if (childNode) {
                    path.shift();
                    return this.findIssueInTree(issue, path, childNode);
                }
            }
            if (node.tag === tagTypes.dictionary) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = node.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref = _step.value;

                        var _ref2 = _slicedToArray(_ref, 2);

                        var keyNode = _ref2[0];
                        var valueNode = _ref2[1];

                        if (keyNode.value === path[0]) {
                            path.shift();
                            if (path.length) {
                                return this.findIssueInTree(issue, path, valueNode);
                            }
                            if (issue.values && issue.values.length) {
                                return this.locationFromTree(valueNode);
                            } else {
                                return this.locationFromTree(keyNode);
                            }
                        }
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
            }
            if (!path.length && node) {
                return this.locationFromTree(node);
            }
            return undefined;
        }
        /**
         * Get the exact issue location from a single YAML AST node.
         */

    }, {
        key: "locationFromTree",
        value: function locationFromTree(node) {
            return {
                column: node.start_mark.column + 1,
                line: node.start_mark.line + 1
            };
        }
    }]);

    return YamlParser;
}();

exports.default = YamlParser;