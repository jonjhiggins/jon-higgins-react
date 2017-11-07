import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App/'
import './index.css' // @TODO move out

ReactDOM.render(
  <App/>
  , document.getElementById('root')
)
registerServiceWorker()
