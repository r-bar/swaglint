"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var CompactReporter = function () {
    function CompactReporter() {
        _classCallCheck(this, CompactReporter);
    }

    _createClass(CompactReporter, [{
        key: "reportIssues",

        /**
         * @inheritdoc
         */
        value: function reportIssues(file, issues) {
            var _this = this;

            return issues.map(function (issue) {
                return _this.rowFromIssue(file, issue);
            }).join('\n');
        }
        /**
         * Get a simple formatted string that represents a single issue.
         */

    }, {
        key: "rowFromIssue",
        value: function rowFromIssue(file, issue) {
            var path = file.getPath();
            var type = issue.type.toLowerCase();
            var slug = issue.slug.toLowerCase();
            var line = issue.location ? issue.location.line : 0;
            var column = issue.location ? issue.location.column : 0;
            return path + ": " + type + " @ " + line + ":" + column + " - " + issue.message + " (" + slug + ")";
        }
    }]);

    return CompactReporter;
}();

exports.default = CompactReporter;