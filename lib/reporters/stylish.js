"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var table = require("text-table");

var StylishReporter = function () {
    function StylishReporter() {
        _classCallCheck(this, StylishReporter);
    }

    _createClass(StylishReporter, [{
        key: "reportIssues",

        /**
         * @inheritdoc
         */
        value: function reportIssues(file, issues) {
            var _this = this;

            var header = this.headerFromFile(file);
            var table = this.correctIssueLocations(this.tableFromRows(issues.map(function (issue) {
                return _this.rowFromIssue(issue);
            })));
            return "\n" + header + "\n" + table + "\n";
        }
    }, {
        key: "headerFromFile",
        value: function headerFromFile(file) {
            return chalk.underline(file.getPath());
        }
    }, {
        key: "issueTypeColor",
        value: function issueTypeColor(issue) {
            if (issue.type === 'warning') {
                return chalk.yellow;
            }
            return chalk.red;
        }
    }, {
        key: "rowFromIssue",
        value: function rowFromIssue(issue) {
            return ['', String(issue.location ? issue.location.line : 0), String(issue.location ? issue.location.column : 0), this.issueTypeColor(issue)(issue.type.toLowerCase()), issue.message, chalk.dim(issue.slug.toLowerCase())];
        }
    }, {
        key: "tableFromRows",
        value: function tableFromRows(rows) {
            return table(rows, {
                align: ['', 'r', 'l', 'l', 'l', 'l'],
                stringLength: function stringLength(value) {
                    return chalk.stripColor(value).length;
                }
            });
        }
    }, {
        key: "correctIssueLocations",
        value: function correctIssueLocations(table) {
            return table.split('\n').map(function (row) {
                return row.replace(/(\d+)\s+(\d+)/, function (match, line, column) {
                    return chalk.dim(line + ":" + column);
                });
            }).join('\n');
        }
    }]);

    return StylishReporter;
}();

exports.default = StylishReporter;