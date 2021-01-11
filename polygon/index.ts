let polygon = {
    verticesEqual: (vertex1: Vertex, vertex2: Vertex): boolean => {
        return vertex1.x == vertex2.x && vertex1.y == vertex2.y;
    },
    isPchainClosed: function (chain: Vertex[]): boolean {
        return this.verticesEqual(chain[0], chain[chain.length - 1]);
    },
    getSlope: function (edge: Edge): number {
        //get index of the vertex with the larger x value
        let xMaxIndex = edge[0].x > edge[1].x ? 0 : 1;
        let v1: Vertex = edge[(xMaxIndex + 1) % 2]
        let v2: Vertex = edge[xMaxIndex];
        let deltaY: number = v2.y - v1.y;
        let deltaX: number = v2.x - v1.x;

        return deltaY / deltaX;
    },
    getLineFromEdge: function (edge: Edge): Line {
        let xMaxIndex = edge[0].x > edge[1].x ? 0 : 1;
        let point = edge[xMaxIndex];
        let slope = this.getSlope(edge);

        return { point: point, slope: slope };
    },
    getIntersection: function (line1: Line, line2: Line) {
        //lines are in point-slope form
        //solve for x
        let xIntersection: number = ((line2.slope * line2.point.x + line1.point.y) - (line1.slope * line1.point.x + line2.point.y)) / (line2.slope - line1.slope)
        //plug in to formula
        let yIntersection: number = line1.slope * (xIntersection - line1.point.x) + line1.point.y;
        return { x: xIntersection, y: yIntersection };
    }
};

module.exports = polygon;