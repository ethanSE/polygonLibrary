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
//-----getLineFromEdge-----
unit['getLineFromEdge'] = (done: () => void) => {
    assert.deepStrictEqual(lib.getLineFromEdge([{ x: 0, y: 0 }, { x: 4, y: 3 }]), { point: { x: 4, y: 3 }, slope: 3 / 4 });
    done()
}
//-----getIntersection-----
unit['getIntersection'] = (done: () => void) => {
    let line1 = lib.getLineFromEdge([{ x: 0, y: 0 }, { x: 2, y: 2 }]);
    let line2 = lib.getLineFromEdge([{ x: 0, y: 2 }, { x: 2, y: 0 }]);
    assert.deepStrictEqual(lib.getIntersection(line1, line2), { x: 1, y: 1 });
    done()
}
unit['getIntersection - another one'] = (done: () => void) => {
    let line1 = lib.getLineFromEdge([{ x: 186, y: 131 }, { x: 342, y: 123 }]);
    let line2 = lib.getLineFromEdge([{ x: 159, y: 72 }, { x: 303, y: 248 }]);
    assert.deepStrictEqual(lib.getIntersection(line1, line2), { x: 206.41610738255034, y: 129.95302013422818 });
    done()
}


module.exports = unit;