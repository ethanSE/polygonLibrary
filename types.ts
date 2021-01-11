type TestNameError = {
  name: string;
  error: Error;
}

type Vertex = {
  x: number,
  y: number
}

type Edge = [Vertex, Vertex]