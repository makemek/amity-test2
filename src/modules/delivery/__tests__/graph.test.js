import { makeGraph } from '../graph'

describe('graph', () => {
  describe('#makeGraph', () => {
    it('given [[source, target, value]], creates expected graph', () => {
      const input = [
        ['A', 'B', 1],
        ['C', 'D', 22],
        ['A', 'C', 333],
      ]
      const graph = makeGraph(input)

      expect(graph.edge('A', 'B')).toEqual(1)
      expect(graph.edge('C', 'D')).toEqual(22)
      expect(graph.edge('A', 'C')).toEqual(333)
    })
  })
})
