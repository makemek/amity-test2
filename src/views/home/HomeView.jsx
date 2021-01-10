import { makeGraph, sumCost } from 'modules/delivery'

import React, { useRef, useState } from 'react'
import { isUndefined } from 'lodash'

export default function HomeView() {
  const inputRef = useRef(null)
  const inputDeliveryRouteRef = useRef(null)
  const [resultCost, setResultCost] = useState()

  return (
    <>
      <section>
        <h1>Input Route</h1>
        <div>
          <div>Routes </div>
          <textarea ref={inputRef} />
        </div>
      </section>
      <section>
        <h1>Calculate delivery cost</h1>
        <div>
          <div>Route </div>
          <input type="text" ref={inputDeliveryRouteRef} />
        </div>
        <button onClick={onCalculateDevlieryCost}>
          Calculate
        </button>
        {!isUndefined(resultCost) && (
          <div>
            {resultCost >= 0 ? resultCost : 'No such route'}
          </div>
        )}
      </section>
    </>
  )

  function onCalculateDevlieryCost() {
    const nodes = inputDeliveryRouteRef.current.value.split(
      '-',
    )
    const edges = _getTransformInputRoute()
    const graph = makeGraph(edges)
    const cost = sumCost(graph, nodes)

    setResultCost(cost)
  }

  function _getTransformInputRoute() {
    const routesString = inputRef.current.value
    const routes = routesString.split(',')
    const edges = routes.map(
      ([source, target, ...value]) => [
        source,
        target,
        parseInt(value.join('')),
      ],
    )

    return edges
  }
}
