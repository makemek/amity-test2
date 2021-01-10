/**
 * Dealing with delivery cost operations
 */

import { isUndefined } from 'lodash'

/**
 * return -1 if cannot sum edges due to invalid node(s)
 * Otherwise, return positive integer
 */
export function sumCost(graph, nodes) {
  if (nodes.length === 1) {
    const [firstNode] = nodes
    return graph.hasNode(firstNode) ? 0 : -1
  }

  let sum = 0
  for (let index = 0; index < nodes.length - 1; ++index) {
    const currentNode = nodes[index]
    const nextNode = nodes[index + 1]
    const edgeValue = graph.edge(currentNode, nextNode)

    if (
      !graph.hasNode(currentNode) ||
      !graph.hasNode(nextNode) ||
      isUndefined(edgeValue)
    ) {
      return -1
    }

    sum += edgeValue
  }
  return sum
}
