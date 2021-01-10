import { makeGraph, sumCost } from 'modules/delivery'

import React, { useRef, useState } from 'react'
import { isUndefined } from 'lodash'

export default function HomeView() {
  const inputRef = useRef(null)
  const inputDeliveryRouteRef = useRef(null)
  const sourceRef = useRef(null)
  const destRef = useRef(null)
  const costRef = useRef(null)
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
      <section>
        <h1>Calculate possible delivery routes</h1>
        <div>
          <div>Source </div>
          <input
            type="text"
            ref={sourceRef}
            maxLength={1}
          />
          <div>Destination </div>
          <input type="text" ref={destRef} maxLength={1} />
        </div>
        <div>
          <div>Maximum Cost </div>
          <input type="number" ref={costRef} />
        </div>
        <button onClick={onCalculateDeliveryRoutes}>
          Calculate
        </button>
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

  function onCalculateDeliveryRoutes() {
    const sourceNode = sourceRef.current.value
    const destNode = destRef.current.value
    const maxCost = costRef.current.value
    const edges = _getTransformInputRoute()
    const graph = makeGraph(edges)
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
