"use strict";
exports.__esModule = true;
var prop = function (content) {
    var lines = content.split("\n");
    var result = {};
    for (var i = 0; i < lines.length; i++) {
        var currentLine = lines[i];
        if (currentLine == "" || currentLine[0] == "#")
            continue;
        var key = currentLine.split("=")[0];
        var value = currentLine.split("=")[1];
        result[key] = value;
    }
    return JSON.stringify(result);
};
exports["default"] = prop;
