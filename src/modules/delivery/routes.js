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
  const traverseGraphFn = _traverseGraphUnlimitSourceVisit(
    timesVisit,
  )
  const results = []
  traverseGraphFn(graph, source, target, results)
  // subgraph with a single node is not a route
  const routes = results.filter(
    (result) => result.length > 1,
  )

  return routes
}

/**
 * modified solution from https://www.geeksforgeeks.org/find-paths-given-source-destination/
 * and graphlib/alg/dfs.js
 *
 * Traverse graph using depth-first search algorithm with an exception that
 * source node can be visited unlimited times.
 */
export function _traverseGraphUnlimitSourceVisit(
  timesVisit,
) {
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

/**
 * Remove any specified subgraph within subgraph if exceeds nMaxRepeat.
 * Only works if all nodes' name has length 1.
 */
export function filterRepeatRoute(
  routes,
  nodes,
  nMaxRepeat,
) {
  const pattern = nodes.join('')
  let count = 0
  const results = routes.filter((route) => {
    const isInUse = route.join('').includes(pattern)
    if (isInUse) {
      ++count
      return count <= nMaxRepeat
    }
    return true
  })

  return results
}
