// Dependencies
const assert = require('assert');
const polygon: Polygon = require('../polygon')

// Holder for Tests
let unit: any = {};

//-----verticesEqual
unit['verticesEqual'] = (done: () => void) => {
    assert.strictEqual(polygon.verticesEqual({ x: 3, y: 3 }, { x: 3, y: 3 }), true)
    done()
}
unit['verticesEqual - unequal'] = (done: () => void) => {
    assert.strictEqual(polygon.verticesEqual({ x: 3, y: 3 }, { x: 4, y: 2 }), false)
    done()
}
//-----isPchainClosed-----
unit['isPchainClosed - closed'] = (done: () => void) => {
    assert.ok(polygon.isPchainClosed([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]));
    done()
}
unit['isPchainClosed - not closed'] = (done: () => void) => {
    assert.strictEqual(polygon.isPchainClosed([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }]), false);
    done()
}
//-----getSlope-----
unit['getSlope'] = (done: () => void) => {
    assert.strictEqual(polygon.getSlope([{ x: 0, y: 0 }, { x: 1, y: 0 }]), 0);
    done()
}
unit['getSlope - infinity'] = (done: () => void) => {
    assert.strictEqual(polygon.getSlope([{ x: 0, y: 0 }, { x: 0, y: 5 }]), Infinity);
    done()
}
unit['getSlope - another test'] = (done: () => void) => {
    assert.strictEqual(polygon.getSlope([{ x: 0, y: 0 }, { x: 4, y: 3 }]), 3 / 4);
    done()
}
//-----getLineFromEdge-----
unit['getLineFromEdge'] = (done: () => void) => {
    assert.deepStrictEqual(polygon.getLineFromEdge([{ x: 0, y: 0 }, { x: 4, y: 3 }]), { point: { x: 4, y: 3 }, slope: 3 / 4 });
    done()
}
//-----getIntersection-----
unit['getIntersection'] = (done: () => void) => {
    let line1 = polygon.getLineFromEdge([{ x: 0, y: 0 }, { x: 2, y: 2 }]);
    let line2 = polygon.getLineFromEdge([{ x: 0, y: 2 }, { x: 2, y: 0 }]);
    assert.deepStrictEqual(polygon.getIntersection(line1, line2), { x: 1, y: 1 });
    done()
}
unit['getIntersection - another one'] = (done: () => void) => {
    let line1 = polygon.getLineFromEdge([{ x: 186, y: 131 }, { x: 342, y: 123 }]);
    let line2 = polygon.getLineFromEdge([{ x: 159, y: 72 }, { x: 303, y: 248 }]);
    assert.deepStrictEqual(polygon.getIntersection(line1, line2), { x: 206.41610738255034, y: 129.95302013422818 });
    done()
}
//-----isPointInRectBounds-----
unit['isPointInRectBounds'] = function (done: () => void) {
    let point = { x: 186, y: 131 };
    let edge: Edge = [{ x: 159, y: 72 }, { x: 303, y: 248 }]
    assert.ok(polygon.isPointInRectBounds(edge, point));
    done();
};
unit['isPointInRectBounds - no'] = function (done: () => void) {
    let point = { x: 304, y: 131 };
    let edge: Edge = [{ x: 159, y: 72 }, { x: 303, y: 248 }]

    assert.strictEqual(polygon.isPointInRectBounds(edge, point), false);
    done();
};
//-----doEdgesIntersect-----
unit['doEdgesIntersect - yes'] = function (done: () => void) {
    let edge1: Edge = [{ x: 0, y: 0 }, { x: 1, y: 1 }]
    let edge2: Edge = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
    assert.ok(polygon.doEdgesIntersect(edge1, edge2))
    done()
}
unit['doEdgesIntersect - paralell'] = function (done: () => void) {
    let edge1: Edge = [{ x: 0, y: 0 }, { x: 5, y: 0 }]
    let edge2: Edge = [{ x: 0, y: 1 }, { x: 5, y: 1 }]
    assert.strictEqual(polygon.doEdgesIntersect(edge1, edge2), false)
    done()
}
unit['doEdgesIntersect - lines intersect but not in bounds'] = function (done: () => void) {
    let edge1: Edge = [{ x: 0, y: 0 }, { x: 1, y: .5 }]
    let edge2: Edge = [{ x: 0, y: 2 }, { x: 1, y: 1.5 }]
    assert.strictEqual(polygon.doEdgesIntersect(edge1, edge2), false)
    done()
}
//----getEdges-----
unit['getEdges'] = function (done: () => void) {
    let vertices: Vertex[] = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    let edges: Edge[] = polygon.getEdges(vertices);
    let expectedEdges: Edge[] = [
        [{ x: 0, y: 0 }, { x: 0, y: 1 }],
        [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 1, y: 1 }, { x: 1, y: 0 }],
        [{ x: 1, y: 0 }, { x: 0, y: 0 }]
    ]
    assert.deepStrictEqual(edges, expectedEdges)
    done()
}
//-----isSelfIntersecting-----
unit['isSelfIntersecting - yes'] = function (done: () => void) {
    let vertices: Vertex[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0.5, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    let edges: Edge[] = polygon.getEdges(vertices);
    assert.strictEqual(polygon.isSelfIntersecting(edges), true)
    done();
}
unit['isSelfIntersecting - no'] = function (done: () => void) {
    let vertices: Vertex[] = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0.5, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    let edges: Edge[] = polygon.getEdges(vertices);
    assert.strictEqual(polygon.isSelfIntersecting(edges), false)
    done();
}

module.exports = unit;