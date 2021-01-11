// Dependencies
const assert = require('assert');
const lib = require('../polygon')

// Holder for Tests
let unit: any = {};

//-----verticesEqual
unit['verticesEqual'] = (done: () => void) => {
    assert.strictEqual(lib.verticesEqual({ x: 3, y: 3 }, { x: 3, y: 3 }), true)
    done()
}
unit['verticesEqual - unequal'] = (done: () => void) => {
    assert.strictEqual(lib.verticesEqual({ x: 3, y: 3 }, { x: 4, y: 2 }), false)
    done()
}
//-----isPchainClosed-----
unit['isPchainClosed - closed'] = (done: () => void) => {
    assert.ok(lib.isPchainClosed([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]));
    done()
}
unit['isPchainClosed - not closed'] = (done: () => void) => {
    assert.strictEqual(lib.isPchainClosed([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }]), false);
    done()
}
//-----getSlope-----
unit['getSlope'] = (done: () => void) => {
    assert.strictEqual(lib.getSlope([{ x: 0, y: 0 }, { x: 1, y: 0 }]), 0);
    done()
}
unit['getSlope - infinity'] = (done: () => void) => {
    assert.strictEqual(lib.getSlope([{ x: 0, y: 0 }, { x: 0, y: 5 }]), Infinity);
    done()
}
unit['getSlope - another test'] = (done: () => void) => {
    assert.strictEqual(lib.getSlope([{ x: 0, y: 0 }, { x: 4, y: 3 }]), 3 / 4);
    done()
}

module.exports = unit;