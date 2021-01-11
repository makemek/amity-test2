import {
  makeGraph,
  sumCost,
  getAllPossibleRoutes,
  filterRepeatRoute,
} from 'modules/delivery'

import React, { useRef, useState } from 'react'
import { isUndefined, defaultTo } from 'lodash'

export default function HomeView() {
  const inputRef = useRef(null)
  const inputDeliveryRouteRef = useRef(null)
  const sourceRef = useRef(null)
  const destRef = useRef(null)
  const costRef = useRef(null)
  const maxStopRef = useRef(null)
  const maxVisitRef = useRef(null)
  const [resultCost, setResultCost] = useState()
  const [resultRoutes, setResultRoutes] = useState()

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
          <div>Maximum Visit</div>
          <input
            type="number"
            ref={maxVisitRef}
            min={1}
            defaultValue={1}
          />
        </div>
        <div>
          <div>Max stop</div>
          <input
            type="number"
            ref={maxStopRef}
            min={-1}
            defaultValue={-1}
          />
          <span>-1 means unlimited</span>
        </div>
        <div>
          <div>Maximum Cost </div>
          <input
            type="number"
            ref={costRef}
            min={-1}
            defaultValue={-1}
          />
          <span>-1 means unlimited</span>
        </div>
        <button onClick={onCalculateDeliveryRoutes}>
          Calculate
        </button>
        <div>Routes are printed in the console</div>
        <div style={{ marginTop: 20 }}>
          Is the example output in case 2 input 1 wrong? or
          am I misunderstand something. If you draw a graph,
          there are only 3 incomming edges to D. Meaning
          that there should be no more than 3 for possible
          routes. But the output expects 4 which is more
          than D&apos;s incomming edges.
        </div>
        {!isUndefined(resultRoutes) && (
          <div>{resultRoutes}</div>
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

  function onCalculateDeliveryRoutes() {
    const source = sourceRef.current.value
    const target = destRef.current.value
    const maxCost =
      costRef.current.value < 0
        ? Number.POSITIVE_INFINITY
        : costRef.current.value
    const maxVisit = defaultTo(maxVisitRef.current.value, 1)
    const maxStop =
      maxStopRef.current.value < 0
        ? Number.POSITIVE_INFINITY
        : maxStopRef.current.value
    const edges = _getTransformInputRoute()
    const graph = makeGraph(edges)
    const routes = getAllPossibleRoutes({
      graph,
      source,
      target,
      timesVisit: maxVisit,
    })

    let filteredRoutes = routes
    routes.forEach((route) => {
      filteredRoutes = filterRepeatRoute(
        filteredRoutes,
        route,
        maxVisit,
      )
    })

    filteredRoutes = filteredRoutes.filter((route) => {
      const isWithinCost = sumCost(graph, route) <= maxCost
      const isWithinStop = route.length <= maxStop
      return isWithinCost && isWithinStop
    })

    console.log('All routes: ', routes)
    console.log('Filtered: ', filteredRoutes)
    setResultRoutes(filteredRoutes.length)
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
