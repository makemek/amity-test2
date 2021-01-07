import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Document from './Document'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
const server = express()

server.disable('x-powered-by').get('/*', (req, res) => {
  const context = {}
  const markup = renderToString(
    <Document assets={assets.client}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </Document>,
  )

  if (context.url) {
    return res.redirect(context.url)
  }
  res.type('html')
  return res.send(markup)
})

export default server
