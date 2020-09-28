import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import {Provider} from 'react-redux'
import {store} from './store/store'
import {App} from './components/app/App'

import './styles/index.css'

ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>, document.getElementById('root'))
serviceWorker.unregister()
