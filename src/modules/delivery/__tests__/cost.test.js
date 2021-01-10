import { sumCost } from '../cost'

import { Graph } from 'graphlib'

describe('cost', () => {
  describe('#sumCost', () => {
    it('given input node NOT exist in a graph, should return -1', () => {
      /**
       * A -> B
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)

      const costNotNode = sumCost(graph, ['NOT_NODE'])
      const costNotNodeInPath = sumCost(graph, [
        'A',
        'NOT_NODE',
        'B',
      ])

      expect(costNotNode).toEqual(-1)
      expect(costNotNodeInPath).toEqual(-1)
    })

    it('given input node exists in a graph, but no edge exist between adjacent node, should return -1', () => {
      /**
       * A -> B -> C
       * D -> E
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      graph.setEdge('D', 'E', 3)

      const cost = sumCost(graph, ['A', 'B', 'C', 'D'])

      expect(cost).toEqual(-1)
    })

    it('given input node exists in a graph, but only 1 node, should return 0', () => {
      /**
       * A -> B -> C
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)

      const cost = sumCost(graph, ['A'])

      expect(cost).toEqual(0)
    })

    it('given input node exists in a graph, edge between input node exist, should return expected number', () => {
      /**
       * A -> B -> C -> D
       */
      const graph = new Graph()
      graph.setEdge('A', 'B', 1)
      graph.setEdge('B', 'C', 2)
      graph.setEdge('C', 'D', 3)

      const cost = sumCost(graph, ['A', 'B', 'C', 'D'])

      expect(cost).toEqual(6)
    })
  })
})
