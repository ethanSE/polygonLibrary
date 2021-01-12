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
    getIntersection: function (line1: Line, line2: Line): Vertex {
        //lines are in point-slope form
        //solve for x
        let xIntersection: number = ((line2.slope * line2.point.x + line1.point.y) - (line1.slope * line1.point.x + line2.point.y)) / (line2.slope - line1.slope)
        //plug in to formula
        let yIntersection: number = line1.slope * (xIntersection - line1.point.x) + line1.point.y;
        return { x: xIntersection, y: yIntersection };
    },
    isPointInRectBounds: function (edge: Edge, point: Vertex): boolean {
        let xMin = Math.min(edge[0].x, edge[1].x);
        let xMax = Math.max(edge[0].x, edge[1].x);
        let isInXRange = xMin <= point.x && point.x <= xMax;

        let yMin = Math.min(edge[0].y, edge[1].y);
        let yMax = Math.max(edge[0].y, edge[1].y);
        let isInYRange = yMin <= point.y && point.y <= yMax;

        return isInXRange && isInYRange;
    },
    doEdgesIntersect: function (edge1: Edge, edge2: Edge): boolean {
        let line1: Line = this.getLineFromEdge(edge1);
        let line2: Line = this.getLineFromEdge(edge2);
        //if paralell return false
        if (line1.slope == line2.slope) {
            return false
        }

        //get intersection point
        let intersection = this.getIntersection(line1, line2);

        //if intersection is in x bounds and in y bounds return true
        let inEdge1Bounds = this.isPointInRectBounds(edge1, intersection)
        let inEdge2Bounds = this.isPointInRectBounds(edge2, intersection);

        return inEdge1Bounds && inEdge2Bounds;
    },
    getEdges: function (vertices: Vertex[]): Edge[] {
        let edges: Edge[] = [];
        for (let i = 0; i < vertices.length - 1; i++) {
            edges.push([vertices[i], vertices[(i + 1) % vertices.length]])
        }
        return edges;
    },
    isSelfIntersecting: function (shape: Edge[]): boolean {
        //generate all pairs of edges that should be checked 
        let comparisonsToMake: [Edge, Edge][] = [];
        //only need to loop halfway, comparison order is not important:
        //doEdgesIntersect(edge1,edge2) = doEdgesIntersect(edge2, edge1)
        for (let i = 0; i <= shape.length; i++) {
            //don't compare to current or next, hence +2
            for (let j = i + 2; j <= shape.length - 1; j++) {
                //don't check if first intersects last
                if (!(i == 0 && j == shape.length)) {
                    comparisonsToMake.push([shape[i], shape[j]])
                }
            }
        }

        //is there a pair of edges that intersects
        let selfIntersects = comparisonsToMake.some((edgePair) => this.doEdgesIntersect(edgePair[0], edgePair[1]));
        return selfIntersects;
    }
};

module.exports = polygon;