var Stream = require('stream');

exports = module.exports = function () {
    var s = new Stream;
        s.readable = true;
        s.writable = true;

    s.write = function (buf) {
        s.emit('data', buf.toString().toUpperCase());
    };

    s.end = function (buf) {
        if (arguments.length) {
            s.write(buf);
        }

        s.writable = false;
    };

    s.destroy = function () {
        s.emit('end');
        s.writable = false;
    };

    return s;
};
