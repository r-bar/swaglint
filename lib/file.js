"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");

var File = function () {
    /**
     * Create a new file instance based on a file source.
     */
    function File(source) {
        _classCallCheck(this, File);

        this.source = source;
    }
    /**
     * The the full path and file name of the file.
     */


    _createClass(File, [{
        key: "getPath",
        value: function getPath() {
            return this.source.path || '<unknown>';
        }
        /**
         * Get the contents of the file, as string.
         */

    }, {
        key: "getContents",
        value: function getContents() {
            if (!this.source.contents) {
                this.source.contents = fs_1.readFileSync(this.source.path, 'utf8');
            }
            return this.source.contents;
        }
        /**
         * Determine if the file is a swagger specification.
         */

    }, {
        key: "isSwagger",
        value: function isSwagger() {
            return (/^["']?swagger["']?\s*:\s*["']?\d+\.\d+["']?/i.test(this.getContents())
            );
        }
    }]);

    return File;
}();

exports.File = File;