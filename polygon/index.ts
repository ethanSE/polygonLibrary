let polygon = {
    verticesEqual: (vertex1: Vertex, vertex2: Vertex) => {
        return vertex1.x == vertex2.x && vertex1.y == vertex2.y;
    },
    isPchainClosed: function (chain: Vertex[]) {
        return this.verticesEqual(chain[0], chain[chain.length - 1]);
    }
};

module.exports = polygon;