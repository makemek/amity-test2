import { _traverseGraph } from '../routes'

import { Graph } from 'graphlib'

describe('routes', () => {
  describe('#_traverseGraph', () => {
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
      _traverseGraph(1)(
        graph,
        'NOT_NODE',
        'NOT_NODE',
        resultsNN,
      )
      expect(resultsNN).toEqual([])
      _traverseGraph(1)(graph, 'A', 'NOT_NODE', resultsYN)
      expect(resultsYN).toEqual([])
      _traverseGraph(1)(graph, 'NOT_NODE', 'A', resultsNY)
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

      _traverseGraph(1)(graph, 'A', 'C', resultsAC)
      _traverseGraph(1)(graph, 'A', 'E', resultsAE)

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

      _traverseGraph(1)(graph, 'A', 'A', resultsAA)

      expect(resultsAA).toEqual([['A']])
    })

    it.skip('given cycles exists, timesVisit > 1, existing curNode and destNode, should have expected result', () => {
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

      _traverseGraph(3)(graph, 'A', 'A', resultsAA)
      expect(resultsAA).toEqual([
        ['A'],
        ['A', 'B', 'A'],
        ['A', 'B', 'A', 'B', 'A'],
        ['A', 'B', 'A', 'B', 'A', 'B', 'A'], // can revisiting to source be valid even though it exceeds timesVisit by 1?
      ])
    })
  })
})
