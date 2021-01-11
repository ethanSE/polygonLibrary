let polygon = {
    verticesEqual: (vertex1: Vertex, vertex2: Vertex): boolean => {
        return vertex1.x == vertex2.x && vertex1.y == vertex2.y;
    },
    isPchainClosed: function (chain: Vertex[]): boolean {
        return this.verticesEqual(chain[0], chain[chain.length - 1]);
    },
    getSlope: function (edge: Edge): number {
        //get index of the vertex with the smaller x value
        let xMaxIndex = edge[0].x > edge[1].x ? 0 : 1;
        let v1: Vertex = edge[(xMaxIndex + 1) % 2]
        let v2: Vertex = edge[xMaxIndex];
        let deltaY: number = v2.y - v1.y;
        let deltaX: number = v2.x - v1.x;
        console.log(deltaX)
        console.log(deltaY)

        return deltaY / deltaX;
    }
};

module.exports = polygon;