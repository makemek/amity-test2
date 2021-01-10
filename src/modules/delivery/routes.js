/**
 * Route is a subgraph of reachable paths from node A to node B where A and B are node in the graph.
 * A node represets a town.
 * An edge represents distance unit between towns.
 */
import { each, has } from 'lodash'

export function getAllPossibleRoutes({
  graph,
  source,
  target,
  timesVisit = 1,
}) {
  const traverseGraphFn = _traverseGraph(timesVisit)
  const results = []
  traverseGraphFn(graph, source, target, results)

  return results
}

/**
 * modified solution from https://www.geeksforgeeks.org/find-paths-given-source-destination/
 * and graphlib/alg/dfs.js
 */
export function _traverseGraph(timesVisit) {
  return function dfs(
    graph,
    curNode,
    destNode,
    results = [],
    visited = {},
    trackingNodes = [],
  ) {
    if (!graph.hasNode(curNode)) {
      return
    }
    visited[curNode] = has(visited, curNode)
      ? (visited[curNode] += 1)
      : 1
    trackingNodes.push(curNode)
    if (curNode === destNode) {
      visited[destNode] = 0 // force looking for alternative paths
      results.push([...trackingNodes]) // push a cloned array, not the reference to an array that may change in each call stack
    }

    each(graph.successors(curNode), (w) => {
      if (!visited[w] || visited[w] < timesVisit) {
        dfs(
          graph,
          w,
          destNode,
          results,
          visited,
          trackingNodes,
        )
      }
    })
    trackingNodes.pop()
    visited[curNode] -= 1
  }
}
