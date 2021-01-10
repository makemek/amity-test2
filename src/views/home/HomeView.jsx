import { makeGraph } from 'modules/delivery'

import React, { useRef } from 'react'

export default function HomeView() {
  const inputRef = useRef(null)

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
          <input type="text" />
        </div>
        <button onClick={onCalculateDevlieryCost}>
          Calculate
        </button>
      </section>
    </>
  )

  function onCalculateDevlieryCost() {
    const edges = _getTransformInputRoute()
    const graph = makeGraph(edges)
    console.log(graph)
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
