import App from './App'
import Document from './Document'

import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
const server = express()

server.disable('x-powered-by').get('/*', (req, res) => {
  const ctxRouter = {}
  const markup = renderToString(
    <Document assets={assets.client}>
      <StaticRouter context={ctxRouter} location={req.url}>
        <App />
      </StaticRouter>
    </Document>,
  )

  if (ctxRouter.url) {
    return res.redirect(ctxRouter.url)
  }
  res.type('html')
  return res.send(markup)
})

export default server
