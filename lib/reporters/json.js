"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var JsonReporter = function () {
    function JsonReporter() {
        _classCallCheck(this, JsonReporter);
    }

    _createClass(JsonReporter, [{
        key: "reportIssues",

        /**
         * @inheritdoc
         */
        value: function reportIssues(file, issues) {
            return JSON.stringify({ file: file, issues: issues });
        }
    }]);

    return JsonReporter;
}();

exports.default = JsonReporter;