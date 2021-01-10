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

  function onCalculateDevlieryCost() {}
}
