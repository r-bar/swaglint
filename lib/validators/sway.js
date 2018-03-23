"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var sway_1 = require("sway");
var yaml_js_1 = require("yaml-js");

var SwayValidator = function () {
    function SwayValidator() {
        _classCallCheck(this, SwayValidator);
    }

    _createClass(SwayValidator, [{
        key: "getIssues",

        /**
         * @inheritdoc
         */
        value: function getIssues(file) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                sway_1.create({ definition: _this.createDocument(file) }).then(function (sway) {
                    var _sway$validate = sway.validate(),
                        errors = _sway$validate.errors,
                        warnings = _sway$validate.warnings;

                    var issues = [].concat(errors.map(function (entry) {
                        return _this.issueFromEntry('error', entry);
                    }), warnings.map(function (entry) {
                        return _this.issueFromEntry('warning', entry);
                    }));
                    resolve(_this.flattenNestedIssues(issues));
                }).catch(reject);
            });
        }
        /**
         * Create a new plain object from the file's contents.
         */

    }, {
        key: "createDocument",
        value: function createDocument(file) {
            return yaml_js_1.load(file.getContents());
        }
        /**
         * Create an issue object from the encountered sway validation entry.
         */

    }, {
        key: "issueFromEntry",
        value: function issueFromEntry(type, entry, parent) {
            var _this2 = this;

            var issue = {
                message: entry.message,
                path: entry.path,
                slug: "SWAY_" + entry.code,
                type: type
            };
            if (parent && parent.path.length) {
                issue.path = this.mergeParentPath(parent.path, issue.path);
            }
            if (entry.params && entry.params.length) {
                issue.values = entry.params;
            }
            if (entry.inner && entry.inner.length) {
                issue.children = this.filterExcessiveIssues(entry.inner.map(function (innerEntry) {
                    return _this2.issueFromEntry(type, innerEntry, issue);
                }));
            }
            return issue;
        }
        /**
         * Merge the parent and child issue path to create an absolute reference to the issue.
         */

    }, {
        key: "mergeParentPath",
        value: function mergeParentPath(parentPath, childPath) {
            var path = parentPath.slice();
            childPath.forEach(function (segment, i) {
                if (path[i] !== segment) {
                    path.push(segment);
                }
            });
            return path;
        }
        /**
         * Get a list of all unique issues from the issue list.
         * Sway has a tendency to overreact to JSON schema failures, so we **SHOULD** filter them.
         */

    }, {
        key: "filterExcessiveIssues",
        value: function filterExcessiveIssues(issues) {
            var unique = [];
            var isEqualFactory = function isEqualFactory(issue) {
                return function (compareIssue) {
                    var issueValues = issue.values || [];
                    var compareValues = compareIssue.values || [];
                    return issue !== compareIssue && issue.type === compareIssue.type && issue.slug === compareIssue.slug && issue.path.toString() === compareIssue.path.toString() && issueValues.toString() === compareValues.toString();
                };
            };
            issues.forEach(function (issue) {
                if (!unique.find(isEqualFactory(issue))) {
                    unique.push(issue);
                }
            });
            return unique;
        }
        /**
         * Flatten the nestable issues to a flat issue array.
         */

    }, {
        key: "flattenNestedIssues",
        value: function flattenNestedIssues(nestedIssues) {
            var _this3 = this;

            var issues = [];
            nestedIssues.forEach(function (issue) {
                issues.push(issue);
                if (issue.children && issue.children.length) {
                    issues = issues.concat(_this3.flattenNestedIssues(issue.children));
                }
                delete issue.children;
            });
            return issues;
        }
    }]);

    return SwayValidator;
}();

exports.default = SwayValidator;