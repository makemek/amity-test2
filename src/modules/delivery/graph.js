/**
 * Utilities for constructing graphlib's graph
 */

import { Graph } from 'graphlib'

export function makeGraph(edges) {
  const graph = new Graph()
  edges.forEach((edge) => graph.setEdge(...edge))

  return graph
}
