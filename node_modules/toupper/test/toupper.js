var assert = require("assert");
var toupper = require('../');
var STR = 'rumpl';

describe('Steam to upper', function () {
    it('should convert the stream to uppercase stream', function () {
        var t = toupper();

        t.on('data', function (buf) {
            assert.equal(buf, STR.toUpperCase());
        });

        t.write(STR);
    });
});
