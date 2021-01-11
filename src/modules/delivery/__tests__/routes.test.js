import {
  _traverseGraphUnlimitSourceVisit,
  _extractSubgraph,
  filterRepeatRoute,
} from '../routes'

import { Graph } from 'graphlib'

describe('routes', () => {
  describe('#_traverseGraphUnlimitSourceVisit', () => {
    it('given non-existing source and/or target node in the graph, result should be []', () => {
      /**
       * A -> B -> C
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      const resultsNN = []
      const resultsYN = []
      const resultsNY = []
      _traverseGraphUnlimitSourceVisit(1)(
        graph,
        'NOT_NODE',
        'NOT_NODE',
        resultsNN,
      )
      expect(resultsNN).toEqual([])
      _traverseGraphUnlimitSourceVisit(1)(
        graph,
        'A',
        'NOT_NODE',
        resultsYN,
      )
      expect(resultsYN).toEqual([])
      _traverseGraphUnlimitSourceVisit(1)(
        graph,
        'NOT_NODE',
        'A',
        resultsNY,
      )
      expect(resultsNY).toEqual([])
    })

    it('given existing but different curNode and destNode, should have expected result', () => {
      /**
       * A -> B -> C
       * ↓         ↑
       * D         E
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      graph.setEdge('A', 'D', 3)
      graph.setEdge('E', 'C', 4)
      const resultsAC = []
      const resultsAE = []

      _traverseGraphUnlimitSourceVisit(1)(
        graph,
        'A',
        'C',
        resultsAC,
      )
      _traverseGraphUnlimitSourceVisit(1)(
        graph,
        'A',
        'E',
        resultsAE,
      )

      expect(resultsAC).toEqual([['A', 'B', 'C']])
      expect(resultsAE).toEqual([])
    })

    it('given existing same curNode and destNode, should have expected result', () => {
      /**
       * A -> B -> C
       * ↓         ↑
       * D         E
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      graph.setEdge('A', 'D', 3)
      graph.setEdge('E', 'C', 4)
      const resultsAA = []

      _traverseGraphUnlimitSourceVisit(1)(
        graph,
        'A',
        'A',
        resultsAA,
      )

      expect(resultsAA).toEqual([['A']])
    })

    it('given cycles exists, timesVisit > 1, existing curNode and destNode, should have expected result', () => {
      /**
       * Cycle(s) has to exist in the graph in order to be able to revisit visited nodes
       * A ⇄ B -> C
       * ↓        ↑
       * D        E
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'A', 2)
      graph.setEdge('B', 'C', 3)
      graph.setEdge('A', 'D', 4)
      graph.setEdge('E', 'C', 5)
      const resultsAA = []

      _traverseGraphUnlimitSourceVisit(3)(
        graph,
        'A',
        'A',
        resultsAA,
      )
      expect(resultsAA).toEqual([
        ['A'],
        ['A', 'B', 'A'],
        ['A', 'B', 'A', 'B', 'A'],
        ['A', 'B', 'A', 'B', 'A', 'B', 'A'],
      ])
    })
  })

  describe('#_extractSubgraph', () => {
    it('given non-existing node, should return null', () => {
      /**
       * A -> B -> C
       * ↓
       * D
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      graph.setEdge('A', 'D', 3)
      const results = _extractSubgraph(graph, [
        'A',
        'NOT_NODE',
        'D',
      ])

      expect(results).toBeNull()
    })

    it('given existing node, path is reachable, should return expected graph', () => {
      /**
       * A -> B -> C
       * ↓
       * D
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      graph.setEdge('A', 'D', 3)

      const results = _extractSubgraph(graph, ['A', 'D'])
      expect(results.hasNode('A')).toBe(true)
      expect(results.hasNode('D')).toBe(true)
      expect(results.hasNode('B')).toBe(false)
      expect(results.hasNode('C')).toBe(false)
      expect(results.edge('A', 'D')).toEqual(3)
    })
  })

  describe('#filterRepeatRoute', () => {
    it('given existing chars, should filter out repeats', () => {
      const routes = [
        ['A', 'B'],
        ['A', 'B', 'C'],
        ['A', 'B', 'A', 'B'],
        ['C', 'A', 'B'],
        ['A', 'D'],
      ]
      const nodes = ['A', 'B']
      const result = filterRepeatRoute(routes, nodes, 2)

      expect(result).toEqual([
        ['A', 'B'],
        ['A', 'B', 'C'],
        ['A', 'D'],
      ])
    })
  })
})
