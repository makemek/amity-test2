import React from 'react'
import PropTypes from 'prop-types'

Document.propTypes = {
  children: PropTypes.node,
  assets: PropTypes.shape({
    css: PropTypes.string,
    js: PropTypes.string,
  }),
}

export default function Document(props) {
  const { children, assets } = props
  const { css, js } = assets

  return (
    <html>
      <head>
        <meta
          httpEquiv="X-UA-Compatible"
          content="IE=edge"
        />
        <meta charSet="utf-8" />
        <title>Eko Delivery Service</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        {css && <link rel="stylesheet" href={css} />}
        {process.env.NODE_ENV === 'production' ? (
          <script src={js} defer></script>
        ) : (
          <script
            src={js}
            defer
            crossOrigin="true"></script>
        )}
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
